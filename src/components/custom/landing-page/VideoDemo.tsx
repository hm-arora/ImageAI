const VideoDemo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">
      <p className="bg-gradient-to-b from-[#e8e8e8] to-[#a7a7a7] bg-clip-text text-center text-5xl font-semibold text-transparent py-2 mb-10">
        How it works?
      </p>
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls
        >
          <source
            src="https://link.turinglabs.work/uploads/image_ai_demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoDemo;
