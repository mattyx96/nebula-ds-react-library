import {
  typographyComponentVariants,
  typographyVariantVariants,
} from "../../../variants/typography";
import {Text} from "../Typography";
import {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: 'Foundations/Typography',
  component: Text,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component: [
          'Nebula typography. `variant` picks the type role; `component` picks the HTML tag — they are independent, so a semantic `h2` can carry a `body1` look and vice versa.',
          'Orbitron roles: `display1`, `display2`, `header1`–`header6`, `button`, `caption`. Roboto Mono roles (all sentences and copy): `body1`–`body5`. `text` is a string shorthand; `children` wins when both are passed.',
          'Never set fonts, sizes or weights by hand — if a role is missing, extend the variants.',
        ].join('\n\n'),
      },
    },
  },
  argTypes: {
    variant: {
      control: {type: 'inline-radio'},
      options: typographyVariantVariants,
      table: {
        defaultValue: {
          summary: 'header4',
        },
      },
    },
    component: {
      control: {type: 'inline-radio'},
      options: typographyComponentVariants,
      table: {
        defaultValue: {
          summary: 'p',
        },
      },
    },
  },
  args: {
    text: 'Live long and prosper.',
    variant: 'header1',
    component: 'p',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Live long and prosper.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="nb-demo-col">
      <Text component="h1" variant="display1">Text with display1</Text>
      <Text component="h2" variant="display2">Text with display2</Text>
      <Text component="h1" variant="header1">Text with header1</Text>
      <Text component="h2" variant="header2">Text with header2</Text>
      <Text component="h3" variant="header3">Text with header3</Text>
      <Text component="h4" variant="header4">Text with header4</Text>
      <Text component="h5" variant="header5">Text with header5</Text>
      <Text component="h6" variant="header6">Text with header6</Text>
      <Text component="p" variant="body1">Text with body1</Text>
      <Text component="p" variant="body2">Text with body2</Text>
      <Text component="p" variant="body3">Text with body3</Text>
      <Text component="p" variant="body4">Text with body4</Text>
      <Text component="p" variant="body5">Text with body5</Text>
      <Text component="span" variant="caption">Text with caption</Text>
      <Text component="span" variant="button">Text with button</Text>
    </div>
  ),
};
