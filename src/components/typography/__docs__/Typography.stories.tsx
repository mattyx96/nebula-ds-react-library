import {
  typographyComponentVariants,
  typographyVariantVariants,
  typographyWeightVariants
} from "../../../variants/typography";
import {Text} from "../Typography";
import {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: 'Components/Typography',
  component: Text,
  tags: ['autodocs', '!dev'],
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
    weight: {
      control: {type: 'inline-radio'},
      options: typographyWeightVariants,
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
  args: {
    text: 'Sample Text',
    variant: 'header1',
    component: 'p',
    weight: 'default',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Sample Text',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
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

/*export const WithComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {typographyComponentVariants.map((component) => (
        <Text key={component} text={`Text as ${component}`} component={component}/>
      ))}
    </div>
  ),
};

export const BoldText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {typographyVariantVariants.map((variant) => (
        <Text key={variant} text={`Bold ${variant}`} variant={variant} weight="bold"/>
      ))}
    </div>
  ),
};

export const LightText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {typographyVariantVariants.map((variant) => (
        <Text key={variant} text={`Light ${variant}`} variant={variant} weight="light"/>
      ))}
    </div>
  ),
};*/
