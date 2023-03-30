import { FormControl } from '../FormControl';

const StepLayout: BTypes.NPage<BTypes.FCChildren, true> = async ({ children }) => {
  return (
    <FormControl>
      <div className="flex h-full flex-col max-w-[1600px] mx-auto pt-8">
        <section className="p-8 w-screen min-h-[calc(100vh-230px)] items-end flex custom-scrollbar-inputs overflow-x-auto overflow-y-hidden pt-10 scrollbar-flipped">
          <div className="grid h-fit gap-8 justify-items-center grid-cols-4 w-fit min-w-[1024px]">
            {children}
          </div>
        </section>
      </div>
    </FormControl>
  );
};

export default StepLayout;
