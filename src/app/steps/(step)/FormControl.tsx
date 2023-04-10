'use client';
import { useSteps } from 'contexts/Steps';
import { useStepsNavigation } from 'contexts/StepsNavigation';
import { StepsNavigationButtons } from 'contexts/StepsNavigation/components/StepsNavigationButtons';
import { notFound, usePathname } from 'next/navigation';

export const FormControl = ({ children }: BTypes.FCChildren) => {
  const pathname = usePathname();
  const step = pathname ? Number(pathname?.replace('steps/', '').replace('/', '')) : 1;
  const { stepsValues, setErrors } = useSteps<'name' | 'email' | 'phone'>();
  const { next, currStep, stepsCompleted } = useStepsNavigation();

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if ((stepsValues[1].phone?.value?.length || 0) <= 8 && step === 1)
      return setErrors({
        phone: 'invalid',
      });
    next();
  }

  if (!stepsCompleted.includes(step) && currStep !== step) return notFound();
  return (
    <form onSubmit={handleSubmit}>
      {children}
      <section className="flex z-50 fixed bottom-8 right-8 self-end h-12">
        <StepsNavigationButtons />
      </section>
    </form>
  );
};
