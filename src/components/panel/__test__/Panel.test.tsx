import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {panelRoundVariants, panelOutlineVariants} from '../../../variants/panel'; // Adjust the import path as necessary
import {Button} from '../../button/Button';
import {Paper} from "../Panel.tsx";

const actions = (
  <div className="nb-demo-actions">
    <Button className="nb-demo-w-full nb-demo-span-3" size="S" variant="standard" text="Cancel"/>
    <Button className="nb-demo-w-full nb-demo-span-2" rounded="R" size="S" variant="filled" text="Do it"/>
  </div>
);

const title = (title = 'Title card') => (
  <h6>{title}</h6>
);

const content = (content = 'Content here') => (
  <div className="nb-demo-block">
    <span>{content}</span>
  </div>
);

describe('Paper', () => {
  panelRoundVariants.forEach((round) => {
    panelOutlineVariants.forEach((outline) => {

      it(`renders correctly with round: ${round}, outline: ${outline}, with actions and title`, () => {
        const {container} = render(
          <Paper
            key={`${round}-${outline}`}
            className="nb-demo-panels__panel"
            round={round}
            outline={outline}
            renderTitle={title(`${round}-${outline}`)}
            renderActions={actions}
          >
            {content(`${round}-${outline}-actions & title`)}
          </Paper>
        );

        expect(container).toMatchSnapshot();
      });

      it(`renders correctly with round: ${round}, outline: ${outline}, with title only`, () => {
        const {container} = render(
          <Paper
            key={`${round}-${outline}-no-actions`}
            className="nb-demo-panels__panel"
            round={round}
            outline={outline}
            renderTitle={title(`${round}-${outline}-no actions`)}
          >
            {content(`${round}-${outline}-title only`)}
          </Paper>
        );

        expect(container).toMatchSnapshot();
      });

      it(`renders correctly with round: ${round}, outline: ${outline}, with content only`, () => {
        const {container} = render(
          <Paper
            key={`${round}-${outline}-no`}
            className="nb-demo-panels__panel"
            round={round}
            outline={outline}
          >
            {content(`${round}-${outline}-content only`)}
          </Paper>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });
});
