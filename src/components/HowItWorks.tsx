interface HowItWorksProps {
  steps: Array<{ icon: string; title: string; description: string }>;
}

const HowItWorks = ({ steps }: HowItWorksProps) => {
  return (
    <section className="py-14">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <span className="text-4xl mb-3 block">{step.icon}</span>
              <h3 className="text-lg font-bold text-primary mb-1">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
