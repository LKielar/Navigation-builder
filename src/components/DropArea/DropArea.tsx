import type { PropsWithChildren } from "react";
import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

const DropArea = ({ children }: PropsWithChildren) => (
  <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
);

export default DropArea;
