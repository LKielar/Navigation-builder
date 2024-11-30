import PlusCircleIcon from "@/assets/PlusCircleIcon.svg";
import Button from "../Button";

const EmptyList = () => {
  return (
    <div className="bg-bg-secondary rounded-md border border-solid border-border-secondary w-[100%] max-w-6xl py-[30px] px-[20px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <span className="text-text-primary font-medium">Menu jest puste</span>

          <span className="text-sm text-text-tertiary">
            W tym menu nie ma jeszcze żadnych linków.
          </span>
        </div>

        <Button colorVariant="primary" icon={<PlusCircleIcon />}>
          Dodaj pozycję menu
        </Button>
      </div>
    </div>
  );
};

export default EmptyList;
