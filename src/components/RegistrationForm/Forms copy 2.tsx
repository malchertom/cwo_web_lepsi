import { useState } from "react";
import { supabase } from "../../supabaseClient";

import './Forms.css'

type Athlete = {
  name: string;
  prijmeni: string;
  age: string;
  sex: string;
  weight_class: string;
  snatch_opener: string;
  cj_opener: string;
};

export default function Forms() {
  const [isTeam, setIsTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [athletes, setAthletes] = useState<Athlete[]>([
    { name: "", prijmeni: "", age: "", sex: "", weight_class: "", snatch_opener: "", cj_opener: "" }
  ]);

  const handleAthleteChange = (index: number, field: string, value: string) => {
    const newAthletes = [...athletes];
    newAthletes[index] = { ...newAthletes[index], [field]: value };
    setAthletes(newAthletes);
  };

  const addAthleteRow = () => {
    if (athletes.length < 4) {
      setAthletes([...athletes, { name: "", prijmeni: "", age: "", sex: "", weight_class: "", snatch_opener: "", cj_opener: "" }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAthletes = athletes.map(a => ({
      jmeno: a.name,
      prijmeni: a.prijmeni,
      vek: Number(a.age),
      pohlavi: a.sex,
      vahovka: a.weight_class,
      snatch_1st: Number(a.snatch_opener),
      cj_1st: Number(a.cj_opener),
      team_id: isTeam ? teamName : null // teamName indicates team membership
    }));

    const { data, error } = await supabase.from("athletes").insert(formattedAthletes);

    console.log({ data, error });
    if (error) alert("Error registering athlete(s). Check console.");
    else alert("Registration successful!");
  };

  return (
    <div className="forms">
      <h2 className="text-xl font-bold mb-4">Registrace</h2>

      <div className="mb-4">
        <label className="mr-2">
          <input type="radio" checked={!isTeam} onChange={() => setIsTeam(false)} /> Individual
        </label>
        <label className="ml-4">
          <input type="radio" checked={isTeam} onChange={() => setIsTeam(true)} /> Team
        </label>
      </div>

      {isTeam && (
        <div className="mb-4">
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {athletes.map((athlete, i) => (
          <div key={i} className="p-2 border rounded space-y-2">
            {isTeam && <h3 className="font-semibold">Member {i + 1}</h3>}
            <input
              placeholder="Name"
              value={athlete.name}
              onChange={(e) => handleAthleteChange(i, "name", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Prijmeni"
              value={athlete.prijmeni}
              onChange={(e) => handleAthleteChange(i, "prijmeni", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Age"
              value={athlete.age}
              onChange={(e) => handleAthleteChange(i, "age", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <select
              value={athlete.sex}
              onChange={(e) => handleAthleteChange(i, "sex", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Sex</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <select
              value={athlete.weight_class}
              onChange={(e) => handleAthleteChange(i, "weight_class", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Weight Class</option>
              <option value="-55kg">-55kg</option>
              <option value="-61kg">-61kg</option>
              <option value="-67kg">-67kg</option>
              <option value="-73kg">-73kg</option>
              <option value="-81kg">-81kg</option>
              <option value="-89kg">-89kg</option>
              <option value="-96kg">-96kg</option>
              <option value="-102kg">-102kg</option>
              <option value="-109kg">-109kg</option>
              <option value="+109kg">+109kg</option>
            </select>
            <input
              type="number"
              placeholder="Snatch Opener (kg)"
              value={athlete.snatch_opener}
              onChange={(e) => handleAthleteChange(i, "snatch_opener", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="C&J Opener (kg)"
              value={athlete.cj_opener}
              onChange={(e) => handleAthleteChange(i, "cj_opener", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        {isTeam && athletes.length < 4 && (
          <button type="button" onClick={addAthleteRow} className="px-3 py-1 bg-gray-600 text-white rounded">
            Add Team Member
          </button>
        )}

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded mt-2">
          Register {isTeam ? "Team" : "Individual"}
        </button>
      </form>
    </div>
  );
}
