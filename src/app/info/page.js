import PageTransition from "../components/PageTransition";
const sender = require('../components/Emailer');

export default function Info() {
// sender();
  return (
    <PageTransition>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Info</h1>
        {/* Your contact page content here */}
      </div>
    </PageTransition>
  );
}
