import { SIZE } from "./Knight";

export type Position = [number, number];
export type PositionObserver = ((position: Position) => void) | null;

export class Game {
  public knightPosition: Position = [SIZE / 2, SIZE / 2];
  private observers: PositionObserver[] = [];

  public observe(o: PositionObserver): () => void {
    this.observers.push(o);
    this.emitChange();

    return (): void => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }

  public moveKnight(toX: number, toY: number): void {
    this.knightPosition = [toX - SIZE / 2, toY - SIZE / 2];
    this.emitChange();
  }

  public canMoveKnight(toX: number, toY: number): boolean {
    return (
      toX > SIZE / 2 &&
      toY > SIZE / 2 &&
      toX < 400 - SIZE / 2 &&
      toY < 800 - SIZE / 2
    );
  }

  private emitChange() {
    const pos = this.knightPosition;
    this.observers.forEach((o) => o && o(pos));
  }
}
