// App.tsx
import { generateTailwindCompatibleTheme } from '../theme.ts';
import Button from './components/button/Button.tsx';
import { IconButton } from './components/button/IconButton.tsx';
import { PlusIcon } from '@heroicons/react/24/solid';

window.console.log(generateTailwindCompatibleTheme());

const variants = ['filled', 'outlined', 'text', 'standard'] as const;
const sizes = ['L', 'M', 'S'] as const;
const rounded = [
  'Default',
  'R',
  'RTop',
  'RBottom',
  'L',
  'LTop',
  'LBottom',
] as const;

export default function App() {
  return (
    <div className="bg-background-primary">
      <div className="w-3/4 mx-auto min-h-screen min-w-screen gap-5 flex flex-col justify-center items-center pt-10">
        {variants.map((variant) => (
          <div key={variant} className="mb-10">
            <h2 className="text-2xl mb-4">
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
            </h2>
            <div className="flex flex-wrap gap-4">
              {sizes.map((size) =>
                rounded.map((round) => (
                  <Button
                    key={`${variant}-${size}-${round}`}
                    text={`Variant: ${variant}, Size: ${size}, Rounded: ${round}`}
                    variant={variant}
                    size={size}
                    rounded={round}
                  />
                ))
              )}
              {sizes.map((size) =>
                rounded.map((round) => (
                  <IconButton
                    key={`${variant}-${size}-${round}-icon`}
                    variant={variant}
                    size={size}
                    rounded={round}
                    icon={<PlusIcon />}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
