import type { FC } from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "./ItemType";
import { Box } from "@mui/material";

export const SIZE = 20;

export const Knight: FC = () => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.KNIGHT,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <Box bgcolor={"red"} height={SIZE} width={SIZE} borderRadius={100} />
      </div>
    </>
  );
};
