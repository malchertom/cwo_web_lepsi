import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

import './Forms.css'
// IWF categories
const maleClasses = ["-55kg", "-61kg", "-67kg", "-73kg", "-81kg", "-89kg", "-96kg", "-102kg", "-109kg", "+109kg"];
const femaleClasses = ["-45kg", "-49kg", "-55kg", "-59kg", "-64kg", "-71kg", "-76kg", "-81kg", "-87kg", "+87kg"];

// Example schools (later replace with your real list)
const universities = ["Univerzita Karlova", "Masarykova univerzita", "ČVUT", "VUT Brno"];

export default function RegistrationForm() {
  const [isTeam, setIsTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamLeaderPhone, setTeamLeaderPhone] = useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");

  const [athletes, setAthletes] = useState([
    {
      first_name: "",
      last_name: "",
      birth_date: "",
      sex: "",
      weight_class: "",
      total: "",
      university: "",
      phone: "",
      email: "",
      tshirt_size: "",
      amcr: false,
      cwo: false,
    },
  ]);

  // For team, ensure 3–4 members
  const teamAthletes = isTeam
    ? athletes.length < 3
      ? [...athletes, ...Array(3 - athletes.length).fill({ ...athletes[0] })]
      : athletes
    : athletes;

  const handleAthleteChange = (index: number, field: string, value: any) => {
    const updated = [...athletes];
    updated[index] = { ...updated[index], [field]: value };
    setAthletes(updated);
  };

  const addTeamMember = () => {
    if (athletes.length < 4) {
      setAthletes([
        ...athletes,
        {
          first_name: "",
          last_name: "",
          birth_date: "",
          sex: "",
          weight_class: "",
          total: "",
          university: "",
          phone: "",
          email: "",
          tshirt_size: "",
          amcr: false,
          cwo: false,
        },
      ]);
    }
  };

  const handleSubmit = async () => {
    const payload = athletes.map((a) => ({
      ...a,
      team_id: isTeam ? teamName : null,
      team_leader_phone: isTeam ? teamLeaderPhone : null,
      team_leader_email: isTeam ? teamLeaderEmail : null,
    }));

    const { data, error } = await supabase.from("athletes").insert(payload);

    if (error) {
      console.error("Error inserting:", error);
      alert("Chyba při registraci: " + error.message);
    } else {
      alert("Registrace úspěšná!");
      console.log("Inserted:", data);
    }
  };

  return (
    <div className="forms">
      <h1 className="text-2xl font-bold text-center">Registrace</h1>

      {/* Switch between Individual and Team */}
      <div className="flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${!isTeam ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => {
            setIsTeam(false);
            setAthletes([athletes[0]]);
          }}
        >
          Jednotlivec
        </button>
        <button
          className={`px-4 py-2 rounded ${isTeam ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setIsTeam(true)}
        >
          Tým (3–4)
        </button>
      </div>

      {/* Team details */}
      {isTeam && (
        <div className="space-y-2 border p-4 rounded">
          <input
            className="w-full border p-2 rounded"
            placeholder="Název týmu"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Mobil vedoucího týmu"
            value={teamLeaderPhone}
            onChange={(e) => setTeamLeaderPhone(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Email vedoucího týmu"
            value={teamLeaderEmail}
            onChange={(e) => setTeamLeaderEmail(e.target.value)}
          />
        </div>
      )}

      {/* Athlete columns */}
      <div className={`grid gap-4 ${isTeam ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
        {teamAthletes.map((a, i) => (
          <div key={i} className="border rounded p-3 space-y-2">
            {isTeam && <h3 className="font-semibold">Člen {i + 1}</h3>}

            <input
              className="w-full border p-2 rounded"
              placeholder="Jméno"
              value={a.first_name}
              onChange={(e) => handleAthleteChange(i, "first_name", e.target.value)}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Příjmení"
              value={a.last_name}
              onChange={(e) => handleAthleteChange(i, "last_name", e.target.value)}
            />
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={a.birth_date}
              onChange={(e) => handleAthleteChange(i, "birth_date", e.target.value)}
            />

            {/* Sex selector */}
            <select
              className="w-full border p-2 rounded"
              value={a.sex}
              onChange={(e) => handleAthleteChange(i, "sex", e.target.value)}
            >
              <option value="">Pohlaví</option>
              <option value="M">M</option>
              <option value="F">Ž</option>
            </select>

            {/* Weight class dropdown */}
            <select
              className="w-full border p-2 rounded"
              value={a.weight_class}
              onChange={(e) => handleAthleteChange(i, "weight_class", e.target.value)}
              disabled={!a.sex}
            >
              <option value="">Hmotnostní kategorie</option>
              {(a.sex === "M" ? maleClasses : femaleClasses).map((wc) => (
                <option key={wc} value={wc}>
                  {wc}
                </option>
              ))}
            </select>

            <input
              className="w-full border p-2 rounded"
              placeholder="Dvojboj (součet)"
              type="number"
              value={a.total}
              onChange={(e) => handleAthleteChange(i, "total", e.target.value)}
            />

            {/* Checkboxes */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={a.cwo}
                onChange={(e) => handleAthleteChange(i, "cwo", e.target.checked)}
              />
              <span>CWO</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={a.amcr}
                onChange={(e) => handleAthleteChange(i, "amcr", e.target.checked)}
              />
              <span>AMČR</span>
            </label>

            {a.amcr && (
              <select
                className="w-full border p-2 rounded"
                value={a.university}
                onChange={(e) => handleAthleteChange(i, "university", e.target.value)}
              >
                <option value="">Vyber univerzitu</option>
                {universities.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            )}

            <input
              className="w-full border p-2 rounded"
              placeholder="Mobil"
              value={a.phone}
              onChange={(e) => handleAthleteChange(i, "phone", e.target.value)}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Email"
              value={a.email}
              onChange={(e) => handleAthleteChange(i, "email", e.target.value)}
            />

            <select
              className="w-full border p-2 rounded"
              value={a.tshirt_size}
              onChange={(e) => handleAthleteChange(i, "tshirt_size", e.target.value)}
            >
              <option value="">Velikost trička</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
        ))}
      </div>

      {/* Add member button for teams */}
      {isTeam && athletes.length < 4 && (
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={addTeamMember}>
          Přidat člena
        </button>
      )}

      {/* Submit */}
      <div className="text-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
          onClick={handleSubmit}
        >
          Registrovat
        </button>
      </div>
    </div>
  );
}
