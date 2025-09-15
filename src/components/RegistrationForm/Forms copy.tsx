import IndividualForm from "./IndividualForm";
import TeamForm from "./TeamForm";

import './Forms.css'

function Forms() {
  return (
    <div className="forms">
      <h1 className="text-2xl font-bold">Olympic Weightlifting Competition Registration</h1>
      <IndividualForm />
      <TeamForm />
    </div>
  );
}

export default Forms;