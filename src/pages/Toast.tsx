import {useRef} from 'react';
import {Button} from '../components/button/Button.tsx';
import {ToastProvider} from '../components/toast/Toast.tsx';
import {useToast} from '../components/toast/toastContext.ts';
import {Text} from '../components/typography/Typography.tsx';

const ToastDemoContent = () => {
  const toast = useToast();
  const firedRef = useRef(false);

  const fire = (type: 'info' | 'success' | 'error' | 'warning' | 'loading') => {
    const titles: Record<string, string> = {
      info: 'New message received',
      success: 'Changes saved',
      error: 'Connection lost',
      warning: 'Fuel low',
      loading: 'Warping…',
    };
    toast.create({
      title: titles[type],
      description: `A ${type} toast fired from the Nebula demo app.`,
      type,
      duration: type === 'loading' ? 4000 : undefined,
    });
  };

  if (!firedRef.current) {
    firedRef.current = true;
    window.setTimeout(() => fire('success'), 150);
  }

  return (
    <>
      <section className="nb-demo-menu__section">
        <Text component="h2" variant="header2" className="nb-demo-menu__title">
          Toast notifications
        </Text>
        <div className="nb-demo-menu__row">
          <Button variant="filled" text="Info" onClick={() => fire('info')} />
          <Button variant="filled" text="Success" onClick={() => fire('success')} />
          <Button variant="outlined" text="Error" onClick={() => fire('error')} />
          <Button variant="outlined" text="Warning" onClick={() => fire('warning')} />
          <Button variant="standard" text="Loading" onClick={() => fire('loading')} />
        </div>
        <div className="nb-demo-menu__row">
          <Button variant="standard" size="S" text="Dismiss all" onClick={() => toast.dismiss()} />
          <Button variant="standard" size="S" text="Remove all" onClick={() => toast.remove()} />
        </div>
      </section>
    </>
  );
};

export const ToastPage = () => (
  <ToastProvider placement="bottom-end">
    <ToastDemoContent />
  </ToastProvider>
);