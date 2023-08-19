type FormStepIndicatorProps = {
  stepName: string;
  // the reason why we need separate classes for the rectangle and triangle background color:
  // https://stackoverflow.com/a/71068925
  rectangleColorClass: string;
  outerTriangleColorClass?: string;
  innerTriangleColorClass?: string;
};

const FormStepIndicator = ({
  stepName,
  rectangleColorClass,
  outerTriangleColorClass,
  innerTriangleColorClass
}: FormStepIndicatorProps) => {
  const fontColor = rectangleColorClass.includes('cyan') ? 'white' : 'black';

  return (
    <div className="flex w-1/3">
      {/* rectangle */}
      <div
        className={`relative flex h-[4rem] w-full items-center justify-center ${rectangleColorClass}`}
      >
        {innerTriangleColorClass && (
          <div
            className={`absolute left-0 h-0 w-0 
          border-b-[2rem] border-l-[3rem]
          border-t-[2rem] border-b-transparent
          ${innerTriangleColorClass}
          border-t-transparent`}
          />
        )}
        <p className={`font-emphasize text-${fontColor}`}>{stepName}</p>
      </div>
      {/* triangle */}
      {outerTriangleColorClass && (
        <div
          className={`h-0 w-0 
            border-b-[2rem] border-l-[3rem]
            border-t-[2rem] border-b-transparent
            ${outerTriangleColorClass}
            border-t-transparent`}
        />
      )}
    </div>
  );
};

export default FormStepIndicator;
