import {buttonRoundedVariants, buttonSizeVariants, buttonVariantVariants} from "../variants/button";
import {Button} from "../components/button/Button.tsx";
import {PlusIcon} from "@heroicons/react/24/solid";
import {IconButton} from "../components/button/IconButton.tsx";
import {Text} from "../components/typography/Typography.tsx";

export const Buttons = () => {
  return (
    <>
      {buttonVariantVariants.map((variant) => (
        <div key={variant} className="mb-10">
          <Text component="h2" variant="header2" className="mb-4">
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
          </Text>
          <div className="flex flex-wrap gap-4">
            {buttonSizeVariants.map((size) =>
              buttonRoundedVariants.map((round) => (
                <Button
                  key={`${variant}-${size}-${round}`}
                  text={`Variant: ${variant}, Size: ${size}, Rounded: ${round}`}
                  variant={variant}
                  size={size}
                  rounded={round}
                  leftIcon={<PlusIcon/>}
                />
              ))
            )}
            {buttonSizeVariants.map((size) =>
              buttonRoundedVariants.map((round) => (
                <IconButton
                  key={`${variant}-${size}-${round}-icon`}
                  variant={variant}
                  size={size}
                  rounded={round}
                  icon={<PlusIcon/>}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </>
  );
}
