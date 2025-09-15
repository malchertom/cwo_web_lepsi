import { useState } from "react";
import { supabase } from '../../supabaseClient';

console.log("Testing Supabase client...");
supabase.from("teams").select("*").then(res => console.log(res));

type Member = {
  name: string;
  prijmeni: string;
  age: string;
  sex: string;
  weight_class: string;
  snatch_opener: string;
  cj_opener: string;
};

export default function TeamForm() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { name: "", prijmeni: "", age: "", sex: "", weight_class: "", snatch_opener: "", cj_opener: "" },
    { name: "", prijmeni: "", age: "", sex: "", weight_class: "", snatch_opener: "", cj_opener: "" },
    { name: "", prijmeni: "", age: "", sex: "", weight_class: "", snatch_opener: "", cj_opener: "" }
  ]);

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: "", prijmeni: "", age: "", sex: "", weight_class: "", snatch_opener: "", cj_opener: "" }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: team, error: teamError } = await supabase.from("teams").insert([{ team_name: teamName }]).select().single();
    if (teamError || !team) return console.error(teamError);

    const formattedMembers = members.map(m => ({
      name: m.name,
      age: Number(m.age),
      sex: m.sex,
      weight_class: m.weight_class,
      snatch_opener: Number(m.snatch_opener),
      cj_opener: Number(m.cj_opener),
      team_id: team.id
    }));

    const { error: membersError } = await supabase.from("athletes").insert(formattedMembers);
    if (membersError) console.error(membersError);
    else alert("Team registered!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">

      
      <button
  onClick={async () => {
    const { data, error } = await supabase.from("athletes").insert([{
      name: "Test Athlete",
      age: 25,
      sex: "M",
      weight_class: "-81kg",
      snatch_opener: 100,
      cj_opener: 125,
      team_id: null
    }]);
    console.log({ data, error });
    alert(error ? "Insert failed" : "Insert succeeded");
  }}
>
  Test Insert
</button>


      <input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Team Name"
        className="w-full p-2 border rounded"
      />
      {members.map((m, i) => (
        <div key={i} className="p-2 border rounded space-y-2">
          <h3>Member {i + 1}</h3>
          <input placeholder="Jmeno" value={m.name} onChange={(e) => handleMemberChange(i, "name", e.target.value)} className="w-full p-2 border rounded" />
          <input placeholder="Prijmeni" value={m.prijmeni} onChange={(e) => handleMemberChange(i, "prijmeni", e.target.value)} className="w-full p-2 border rounded" />
          <input type="number" placeholder="Age" value={m.age} onChange={(e) => handleMemberChange(i, "age", e.target.value)} className="w-full p-2 border rounded" />
          <select value={m.sex} onChange={(e) => handleMemberChange(i, "sex", e.target.value)} className="w-full p-2 border rounded">
            <option value="">Sex</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <select value={m.weight_class} onChange={(e) => handleMemberChange(i, "weight_class", e.target.value)} className="w-full p-2 border rounded">
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
          <input type="number" placeholder="Snatch Opener (kg)" value={m.snatch_opener} onChange={(e) => handleMemberChange(i, "snatch_opener", e.target.value)} className="w-full p-2 border rounded" />
          <input type="number" placeholder="C&J Opener (kg)" value={m.cj_opener} onChange={(e) => handleMemberChange(i, "cj_opener", e.target.value)} className="w-full p-2 border rounded" />
        </div>
      ))}
      {members.length < 4 && (
        <button type="button" onClick={addMember} className="px-3 py-1 bg-gray-600 text-white rounded">
          Add Member
        </button>
      )}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Register Team</button>
    </form>
  );
}
