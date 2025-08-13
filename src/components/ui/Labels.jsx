import  React from "react";
import  {Label} from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "../../utils/placeholder";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Labels = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Label
      ref={ref}
      className={cn(labelVariants(), className)}
      {...rest}
    />
  );
});
Label.displayName = "Label";

export  {Labels} ;
