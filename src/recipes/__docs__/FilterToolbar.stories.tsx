import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button} from '../../components/button/Button';
import {Checkbox} from '../../components/checkbox/Checkbox';
import {Input} from '../../components/input/Input';
import {Select} from '../../components/select/Select';
import {Text} from '../../components/typography/Typography';

type Ship = {
  name: string;
  registry: string;
  class: string;
  active: boolean;
};

const ships: Ship[] = [
  {name: 'USS Enterprise', registry: 'NCC-1701', class: 'Constitution', active: true},
  {name: 'USS Voyager', registry: 'NCC-74656', class: 'Intrepid', active: true},
  {name: 'USS Defiant', registry: 'NX-74205', class: 'Defiant', active: true},
  {name: 'USS Discovery', registry: 'NCC-1031', class: 'Crossfield', active: false},
  {name: 'USS Cerritos', registry: 'NCC-75567', class: 'California', active: false},
  {name: 'USS Farragut', registry: 'NCC-1647', class: 'Constitution', active: false},
];

const classes = [
  {value: 'Constitution', label: 'Constitution'},
  {value: 'Intrepid', label: 'Intrepid'},
  {value: 'Defiant', label: 'Defiant'},
  {value: 'Crossfield', label: 'Crossfield'},
  {value: 'California', label: 'California'},
];

const chevron = <ChevronDownIcon width={16} height={16} />;

const FilterToolbar = () => {
  const [search, setSearch] = useState('');
  const [shipClass, setShipClass] = useState<string[]>([]);
  const [activeOnly, setActiveOnly] = useState(false);

  const filtered = ships.filter((ship) => {
    const matchesSearch =
      ship.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      ship.registry.toLowerCase().includes(search.trim().toLowerCase());
    const matchesClass = shipClass.length === 0 || shipClass.includes(ship.class);
    const matchesActive = !activeOnly || ship.active;
    return matchesSearch && matchesClass && matchesActive;
  });

  const reset = () => {
    setSearch('');
    setShipClass([]);
    setActiveOnly(false);
  };

  return (
    <div className="nb-recipe-col">
      <div className="nb-recipe-toolbar">
        <Input
          label="Search"
          placeholder="Name or registry…"
          className="nb-recipe-toolbar__grow"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          label="Class"
          placeholder="All classes"
          indicator={chevron}
          items={classes}
          value={shipClass}
          onValueChange={setShipClass}
        />
        <div className="nb-recipe-toolbar__controls">
          <Checkbox
            label="Active only"
            checked={activeOnly}
            onCheckedChange={(checked) => setActiveOnly(checked === true)}
          />
          <Button variant="standard" size="S" text="Reset" onClick={reset} />
        </div>
      </div>

      <Text component="span" variant="body3">
        {filtered.length} of {ships.length} ships
      </Text>

      <div className="nb-recipe-list">
        {filtered.map((ship) => (
          <div key={ship.registry} className="nb-recipe-list__item">
            <div>
              <Text component="span" variant="body1">{ship.name}</Text>
              <Text component="span" variant="body3">
                {ship.registry} · {ship.class}
              </Text>
            </div>
            <Text component="span" variant="body3">{ship.active ? 'Active' : 'Inactive'}</Text>
          </div>
        ))}
        {filtered.length === 0 && (
          <Text component="span" variant="body3">No ships match the current filters.</Text>
        )}
      </div>
    </div>
  );
};

const meta = {
  title: 'Recipes/Filter Toolbar',
  component: FilterToolbar,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component:
          'A search + filter toolbar for a list. Combines `Input`, `Select` and `Checkbox` into one derived filter query, with a `Button` to reset. No extra state library needed — the filtered list is computed straight from the three filters.',
      },
    },
  },
} satisfies Meta<typeof FilterToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FilterToolbar />,
};
