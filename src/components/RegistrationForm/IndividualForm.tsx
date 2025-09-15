import { useState } from "react";
import { supabase } from '../../supabaseClient';

export default function IndividualForm() {
  const [form, setForm] = useState({
    name: "",
    prijmeni: "",
    age: "",
    sex: "",
    weight_class: "",
    snatch_opener: "",
    cj_opener: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("athletes").insert([{
      jmeno: form.name,
      prijmeni: form.prijmeni,
      vek: Number(form.age),
      pohlavi: form.sex,
      vahovka: form.weight_class,
      snatch_1st: Number(form.snatch_opener),
      cj_1st: Number(form.cj_opener),
      team_id: null
    }]);
    if (error) console.error(error);
    else alert("Athlete registered!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="prijmeni" placeholder="Surname" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" />
      <select name="sex" onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Sex</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <select name="weight_class" onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Weight Class</option>
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
      <input name="snatch_opener" type="number" placeholder="Snatch Opener (kg)" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="cj_opener" type="number" placeholder="C&J Opener (kg)" onChange={handleChange} className="w-full p-2 border rounded" />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Register Athlete</button>
    </form>
  );
}
