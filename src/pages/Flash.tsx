import {useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {useFlash} from '../components/flash/flashContext.ts';
import {Button} from '../components/button/Button.tsx';
import {Paper} from '../components/panel/Panel.tsx';
import {Text} from '../components/typography/Typography.tsx';
import {Menu} from '../components/menu/Menu.tsx';

export const FlashPage = () => {
  const {flash} = useFlash();
  const [repeats, setRepeats] = useState(2);

  const submitWithError = () => flash('error', {repeats});
  const submitWithSuccess = () => flash('success', {repeats});

  return (
    <div className="nb-demo-flash">
      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Flash Feedback
        </Text>
        <div className="nb-demo-menu__row">
          <Button variant="filled" text="Flash error" onClick={submitWithError}/>
          <Button variant="filled" text="Flash success" onClick={submitWithSuccess}/>
          <Text component="span" variant="body1">repeats:</Text>
          {[1, 2, 3].map((n) => (
            <Button
              key={n}
              size="S"
              variant={repeats === n ? 'filled' : 'standard'}
              text={String(n)}
              onClick={() => setRepeats(n)}
            />
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Mock form (with errors)
        </Text>
        <div className="nb-demo-flash__form">
          <Paper
            outline="500"
            renderTitle={<Text component="h6" variant="header6">Submit the form</Text>}
            renderActions={
              <>
                <Button variant="standard" size="S" text="Cancel"/>
                <Button variant="filled" size="S" rounded="R" text="Submit" onClick={submitWithError}/>
              </>
            }
          >
            <Text component="p" variant="body1">
              This panel, the buttons, the menu, and the whole page flash together
              when feedback is triggered — the token roles stay intact so the UI
              remains recognizable, only the hue changes.
            </Text>
            <div className="nb-demo-menu__row">
              <Menu
                text="Actions"
                indicator={<ChevronDownIcon width={16} height={16}/>}
                items={[
                  {value: 'edit', text: 'Edit'},
                  {value: 'duplicate', text: 'Duplicate'},
                  {value: 'delete', text: 'Delete'},
                ]}
              />
              <Button variant="outlined" size="S" text="Simulate error" onClick={submitWithError}/>
              <Button variant="outlined" size="S" text="Simulate success" onClick={submitWithSuccess}/>
            </div>
          </Paper>
        </div>
      </section>
    </div>
  );
};
