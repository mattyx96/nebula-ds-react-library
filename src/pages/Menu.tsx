import {useState} from 'react';
import {
  ChevronDownIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import {Menu, type MenuItem} from '../components/menu/Menu.tsx';
import {Text} from '../components/typography/Typography.tsx';
import {
  menuAlignVariants,
  menuOutlineVariants,
  menuRoundedVariants,
  menuRoundVariants,
  menuSizeVariants,
  menuVariantVariants,
} from '../variants/menu';

const defaultItems: MenuItem[] = [
  {value: 'edit', text: 'Edit', leftIcon: <PencilIcon width={16} height={16}/>},
  {value: 'duplicate', text: 'Duplicate', leftIcon: <PlusIcon width={16} height={16}/>},
  {value: 'delete', text: 'Delete', leftIcon: <TrashIcon width={16} height={16}/>},
];

const chevron = <ChevronDownIcon width={16} height={16}/>;

export const MenuPage = () => {
  const [lastSelected, setLastSelected] = useState('none');

  return (
    <>
      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Default
        </Text>
        <div className="nb-demo-menu__row">
          <Menu text="Actions" indicator={chevron} items={defaultItems}/>
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Responsive
        </Text>
        <div className="nb-demo-menu__row">
          <Menu
            text="Actions"
            title="Actions"
            indicator={chevron}
            items={defaultItems}
          />
        </div>
        <Text component="span" className="nb-demo-menu__hint">
          Shrink the window below the breakpoint (default: lg / 1024px) — the dropdown automatically becomes a bottom sheet.
        </Text>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Bottom Sheet
        </Text>
        <div className="nb-demo-menu__row">
          <Menu
            text="Actions"
            mode="sheet"
            title="Actions"
            description="Choose an action"
            indicator={chevron}
            items={defaultItems}
          />
        </div>
        <Text component="span" className="nb-demo-menu__hint">
          Forced with <code>mode=&quot;sheet&quot;</code> — the same items render in a bottom sheet.
        </Text>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Trigger Variants
        </Text>
        <div className="nb-demo-menu__row">
          {menuVariantVariants.map((variant) => (
            <Menu
              key={variant}
              text={variant}
              variant={variant}
              indicator={chevron}
              items={defaultItems}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Sizes
        </Text>
        <div className="nb-demo-menu__row">
          {menuSizeVariants.map((size) => (
            <Menu
              key={size}
              text={`Size ${size}`}
              size={size}
              indicator={chevron}
              items={defaultItems}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Rounded Triggers
        </Text>
        <div className="nb-demo-menu__row">
          {menuRoundedVariants.map((rounded) => (
            <Menu
              key={rounded}
              text={String(rounded)}
              rounded={rounded}
              indicator={chevron}
              items={defaultItems}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Panel Rounds
        </Text>
        <div className="nb-demo-menu__row">
          {menuRoundVariants.map((round) => (
            <Menu
              key={round}
              text={`Round ${round}`}
              round={round}
              indicator={chevron}
              items={defaultItems}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Panel Outlines
        </Text>
        <div className="nb-demo-menu__row">
          {menuOutlineVariants.map((outline) => (
            <Menu
              key={outline}
              text={`Outline ${outline}`}
              outline={outline}
              indicator={chevron}
              items={defaultItems}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Dropdown Alignment
        </Text>
        <div className="nb-demo-menu__row">
          {menuAlignVariants.map((align) => (
            <Menu
              key={align}
              text={`Align ${align}`}
              align={align}
              indicator={chevron}
              items={defaultItems}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Separators
        </Text>
        <div className="nb-demo-menu__row">
          <Menu
            text="File"
            indicator={chevron}
            items={[
              {value: 'new', text: 'New File', leftIcon: <PlusIcon width={16} height={16}/>},
              {value: 'separator-1', separator: true},
              {value: 'edit', text: 'Edit', leftIcon: <PencilIcon width={16} height={16}/>},
              {value: 'duplicate', text: 'Duplicate'},
              {value: 'separator-2', separator: true},
              {value: 'delete', text: 'Delete', leftIcon: <TrashIcon width={16} height={16}/>},
            ]}
          />
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Disabled Items
        </Text>
        <div className="nb-demo-menu__row">
          <Menu
            text="Actions"
            indicator={chevron}
            items={[
              {value: 'edit', text: 'Edit'},
              {value: 'download', text: 'Download', disabled: true},
              {value: 'delete', text: 'Delete', disabled: true},
            ]}
          />
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Selection
        </Text>
        <div className="nb-demo-menu__row">
          <Menu
            text="Select an option"
            variant="outlined"
            onSelect={setLastSelected}
            indicator={chevron}
            items={[
              {value: 'option-1', text: 'Option 1'},
              {value: 'option-2', text: 'Option 2'},
              {value: 'option-3', text: 'Option 3'},
            ]}
          />
          <Text component="span" variant="body1">
            Last selected: {lastSelected}
          </Text>
        </div>
      </section>
    </>
  );
};
