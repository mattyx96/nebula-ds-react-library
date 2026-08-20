import {useState} from 'react';
import {Input} from '../components/input/Input.tsx';
import {Text} from '../components/typography/Typography.tsx';
import {Button} from '../components/button/Button.tsx';
import {inputRoundedVariants, inputSizeVariants, inputVariantVariants} from '../variants/input';

export const InputPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && name.trim().length === 0 ? ['Name is required'] : undefined;
  const emailError =
    submitted && !/^\S+@\S+\.\S+$/.test(email) ? ['Enter a valid email address'] : undefined;

  return (
    <>
      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Sizes
        </Text>
        <div className="nb-demo-input__col">
          {inputSizeVariants.map((size) => (
            <Input key={size} size={size} label={`Size ${size}`} placeholder={`Size ${size}`}/>
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Variants
        </Text>
        <div className="nb-demo-input__col">
          {inputVariantVariants.map((variant) => (
            <Input key={variant} variant={variant} label={variant} placeholder={variant}/>
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Rounded Corners
        </Text>
        <div className="nb-demo-input__col">
          {inputRoundedVariants.map((rounded) => (
            <Input key={rounded} rounded={rounded} placeholder={String(rounded)}/>
          ))}
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          States
        </Text>
        <div className="nb-demo-input__col">
          <Input label="Helper" placeholder="With a hint" helperText="This is a hint."/>
          <Input label="Invalid" placeholder="Has an error" errors={['Required field']}/>
          <Input label="Disabled" placeholder="Disabled" disabled value="locked"/>
          <Input label="Required" placeholder="Required" isRequired/>
        </div>
      </section>

      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Form Example
        </Text>
        <div className="nb-demo-input__form">
          <Input
            label="Name"
            isRequired
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            errors={nameError}
          />
          <Input
            label="Email"
            type="email"
            isRequired
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            errors={emailError}
          />
          <div className="nb-demo-menu__row">
            <Button variant="standard" size="S" text="Reset" onClick={() => {
              setName('');
              setEmail('');
              setSubmitted(false);
            }}/>
            <Button variant="filled" size="S" rounded="R" text="Submit" onClick={() => setSubmitted(true)}/>
          </div>
        </div>
      </section>
    </>
  );
};
