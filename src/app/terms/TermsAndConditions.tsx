import Link from "next/link";

export default function Component() {
  const WebsiteName = "ImageAI";
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions of Use</h1>
      <p className="mb-6">
        By accessing and using {WebsiteName}, you agree to be bound by these
        Terms and Conditions (&quot;Terms&quot;). If you do not agree to these
        Terms, please refrain from using the Website.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Use of the Website</h2>
        <p className="mb-2">
          1.1. The Website allows users to generate images using artificial
          intelligence (AI) models. By using the Website, you confirm that you
          are legally entitled to create and use such images.
        </p>
        <p className="mb-2">
          1.2. You must ensure that any content you upload or input for the
          generation of images, including but not limited to text prompts and
          reference images, does not infringe on any third-party copyrights,
          trademarks, or intellectual property rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Copyright Infringement
        </h2>
        <h3 className="text-xl font-medium mb-2">2.1. User Responsibility</h3>
        <p className="mb-4">
          All content generated through the Website may be subject to copyright
          laws. You are solely responsible for ensuring that your use of
          generated images complies with applicable copyright laws. You may not
          use the Website to create images that infringe on any third-party
          copyrights, trademarks, or other intellectual property rights.
        </p>
        <h3 className="text-xl font-medium mb-2">2.2. Prohibited Uses</h3>
        <p className="mb-2">You agree not to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Use any content on the Website or generated images to create
            derivative works based on copyrighted materials without permission.
          </li>
          <li>
            Use the Website to upload copyrighted content or content you do not
            have rights to use as input for generating images.
          </li>
          <li>
            Reproduce, distribute, or publicly display copyrighted works without
            permission from the copyright holder.
          </li>
        </ul>
        <h3 className="text-xl font-medium mb-2">2.3. DMCA Takedown Notices</h3>
        <p className="mb-4">
          If you believe that content generated or used on the Website infringes
          upon your copyright, you may file a Digital Millennium Copyright Act
          (DMCA) notice. Send the following information to [Insert Email]:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            A description of the copyrighted work you believe is infringed.
          </li>
          <li>
            A description of where the infringing content is located on the
            Website.
          </li>
          <li>Your contact details (name, address, email).</li>
          <li>
            A statement that you have a good faith belief that the use of the
            content is unauthorized.
          </li>
          <li>
            A statement that the information you provide is accurate and that
            you are authorized to act on behalf of the copyright owner.
          </li>
        </ul>
        <h3 className="text-xl font-medium mb-2">2.4. Repeat Infringers</h3>
        <p className="mb-4">
          We reserve the right to terminate user accounts found to be repeat
          infringers of copyright.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Intellectual Property Rights
        </h2>
        <p className="mb-2">
          3.1. The Website and its original content (excluding user-generated
          content) are the exclusive property of {WebsiteName} and its
          licensors. You agree not to copy, distribute, or create derivative
          works from any content on the Website without explicit permission.
        </p>
        <p className="mb-2">
          3.2. {WebsiteName} does not claim ownership over any content you
          upload. However, by uploading or creating content on the Website, you
          grant {WebsiteName} a non-exclusive, royalty-free license to use,
          modify, distribute, and publicly display that content in connection
          with the operation of the Website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Limitations of Liability
        </h2>
        <p className="mb-2">
          4.1. {WebsiteName} is not responsible for any legal claims, damages,
          or losses arising from your use of the Website, including but not
          limited to copyright infringement or violation of intellectual
          property rights.
        </p>
        <p className="mb-2">
          4.2. The images generated on the Website are based on user inputs and
          third-party AI models, and {WebsiteName} makes no guarantee that the
          generated content is free from copyright issues.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Changes to These Terms
        </h2>
        <p className="mb-2">
          5.1. {WebsiteName} reserves the right to modify these Terms at any
          time. You will be notified of any changes by a prominent notice on the
          Website or by email. Your continued use of the Website after any
          changes constitutes acceptance of the modified Terms.
        </p>
      </section>

      {/* <footer className="mt-8 text-sm text-gray-600">
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <Link
            href="mailto:contact@example.com"
            className="text-blue-600 hover:underline"
          >
            contact@example.com
          </Link>
          .
        </p>
      </footer> */}
    </div>
  );
}
