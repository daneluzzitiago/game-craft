import type { CSSProperties, FC } from "react";
import { useEffect, useState } from "react";

import { BoardSquare } from "./BoardSquare";
import type { Game, Position } from "./Game";
import { Piece } from "./Piece";
import { Box, Button } from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemType";

export interface BoardProps {
  game: Game;
}

/** Styling properties applied to the board element */
const boardStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap",
  backgroundImage: "url('/court.svg')",  // Adiciona imagem de fundo
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative"
};
/** Styling properties applied to each square element */
const squareStyle: CSSProperties = { width: "12.5%", height: "12.5%" };

/**
 * The chessboard component
 * @param props The react props
 */
export const Board: FC<BoardProps> = ({ game }) => {
  const [[knightX, knightY], setKnightPos] = useState<Position>(
    game.knightPosition
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: (item, monitor) => {
        const offset = monitor.getSourceClientOffset();
        if (offset) {
          return game.canMoveKnight(offset.x, offset.y);
        }
        return false;
      },
      drop: (item, monitor) => {
        const offset = monitor.getSourceClientOffset();
        if (offset) {
          game.moveKnight(offset.x, offset.y);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game]
  );

  useEffect(() => game.observe(setKnightPos));

  function renderSquare(i: number) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y} game={game}>
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    );
  }

  const squares = [];
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i));
  }
  return (
    <div style={boardStyle} ref={drop}>

      <Box position="absolute" sx={{ top: knightY, left: knightX }}>
        <Piece isKnight />
      </Box>
    </div>
  );
};
