export default function Section3() {
  return (
    <div className="flex flex-col w-full">
      <div className="text-center py-12 px-6">
        <h1 className="text-xl md:text-4xl font-bold">
          From Reporting to Resolution: Our Approach
        </h1>
      </div>

      <section className="relative h-[50vh] flex items-center px-6">
        <span className="absolute text-primary opacity-20 text-[12rem] font-bold left-6">
          1
        </span>
        <div className="max-w-xl ml-32">
          <h2 className="text-2xl font-bold mb-4">Report</h2>
          <p className="text-muted-foreground">
            Our user-friendly web platform allows pedestrians to report
            accidents quickly and securely. Provide details, upload photos, and
            pinpoint locations with ease.
          </p>
        </div>
      </section>

      <section className="relative h-[50vh] flex items-center justify-end bg-muted/50 px-6">
        <div className="max-w-xl mr-32">
          <h2 className="text-2xl font-bold mb-4 text-right">Analyze</h2>
          <p className="text-muted-foreground text-right">
            Roadsafe&apos;s advanced algorithms analyze reported accident data in
            real-time, uncovering patterns and potential high-risk zones. This
            insight enables relevant authorities to optimize resource allocation
            for accident management.
          </p>
        </div>
        <span className="absolute text-primary opacity-20 text-[12rem] font-bold right-6">
          2
        </span>
      </section>

      <section className="relative h-[50vh] flex items-center px-6">
        <span className="absolute text-primary opacity-20 text-[12rem] font-bold left-6">
          3
        </span>
        <div className="max-w-xl ml-32">
          <h2 className="text-2xl font-bold mb-4">Respond</h2>
          <p className="text-muted-foreground">
            When an incident is reported, Roadsafe promptly notifies the
            relevant authorities. Our streamlined system ensures efficient
            dispatch and coordination of emergency resources, significantly
            minimizing response times.
          </p>
        </div>
      </section>

      <section className="relative h-[50vh] flex items-center justify-end bg-muted/50 px-6">
        <div className="max-w-xl mr-32">
          <h2 className="text-2xl font-bold mb-4 text-right">Resolve</h2>
          <p className="text-muted-foreground text-right">
            Stay updated with Roadsafe&apos;s transparent case tracking system. Track
            the progress of reported incidents and receive real-time updates as
            emergency services take action.
          </p>
        </div>
        <span className="absolute text-primary opacity-20 text-[12rem] font-bold right-6">
          4
        </span>
      </section>
    </div>
  );
}
