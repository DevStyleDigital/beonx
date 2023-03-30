import { Header } from './Header';
import { StepsNavigationProvider } from 'contexts/StepsNavigation';
import { StepsProvider } from 'contexts/Steps';
import { PercentagesProvider } from 'contexts/Percentages';

const StepLayout: BTypes.NPage<BTypes.FCChildren, true> = async ({ children }) => {
  return (
    <StepsNavigationProvider>
      <StepsProvider>
        <PercentagesProvider>
          <div className="flex h-full flex-col max-w-[1600px] mx-auto pt-8">
            <Header />
            <main className="h-full mt-10">{children}</main>
          </div>
        </PercentagesProvider>
      </StepsProvider>
    </StepsNavigationProvider>
  );
};

export default StepLayout;
