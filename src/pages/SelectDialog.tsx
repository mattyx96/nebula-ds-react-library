import {useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Select} from '../components/select/Select.tsx';
import {Dialog} from '../components/dialog/Dialog.tsx';
import {Button} from '../components/button/Button.tsx';
import {Text} from '../components/typography/Typography.tsx';

const countries = [
  {label: 'Nigeria', value: 'NG'},
  {label: 'Japan', value: 'JP'},
  {label: 'Korea', value: 'KO'},
  {label: 'Kenya', value: 'KE'},
  {label: 'Italy', value: 'IT'},
  {label: 'United Kingdom', value: 'UK'},
  {label: 'Ghana', value: 'GH'},
];

const chevron = <ChevronDownIcon width={16} height={16}/>;

export const SelectDialogPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Select
        </Text>
        <div className="nb-demo-menu__row">
          <Select
            label="Country"
            placeholder="Pick a country"
            indicator={chevron}
            items={countries}
          />
          <Select
            label="Controlled"
            placeholder="Choose one"
            value={selected}
            onValueChange={setSelected}
            variant="outlined"
            indicator={chevron}
            items={countries}
          />
          <Text component="span" variant="body1">
            Controlled: {selected.join(', ') || 'none'}
          </Text>
        </div>
        <div className="nb-demo-menu__row">
          <Select label="Multiple" multiple placeholder="Pick countries" variant="standard" indicator={chevron} items={countries}/>
          <Select label="Invalid" invalid placeholder="Has error" variant="outlined" indicator={chevron} items={countries}/>
          <Select label="Disabled" disabled placeholder="Disabled" variant="text" indicator={chevron} items={countries}/>
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Dialog
        </Text>
        <div className="nb-demo-menu__row">
          <Dialog
            text="Open dialog"
            title="Edit profile"
            description="Make changes to your profile here."
            variant="filled"
          >
            <Button variant="standard" size="S" text="Cancel"/>
            <Button variant="filled" size="S" rounded="R" text="Save changes"/>
          </Dialog>

          <Dialog
            text="Confirm"
            title="Confirm deletion"
            description="This action cannot be undone."
            variant="outlined"
            role="alertdialog"
          >
            <div className="nb-demo-row">
              <Button variant="standard" size="S" text="Cancel"/>
              <Button variant="filled" size="S" rounded="R" text="Delete"/>
            </div>
          </Dialog>
        </div>
      </section>
    </>
  );
};
