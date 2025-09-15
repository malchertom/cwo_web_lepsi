import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./RegistrationForm.css";

type Athlete = {
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: "M" | "F";
  weightClass: string;
  total: number | "";
  university?: string;
  phone: string;
  email: string;
  tshirtSize: string;
  amcr: boolean;
  cwo: boolean;
};

const maleWeightClasses = ["-67kg", "-73kg", "-81kg", "-89kg", "-96kg", "-102kg", "-109kg", "+109kg"];
const femaleWeightClasses = ["-49kg", "-55kg", "-59kg", "-64kg", "-71kg", "-76kg", "-81kg", "+87kg"];
const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const universities = ["UK Praha", "MUNI Brno", "VUT Brno", "ČVUT Praha"];

const emptyAthlete: Athlete = {
  firstName: "",
  lastName: "",
  birthDate: "",
  sex: "M",
  weightClass: "",
  total: "",
  university: "",
  phone: "",
  email: "",
  tshirtSize: "",
  amcr: false,
  cwo: false,
};

export default function RegistrationForm() {
  const [isTeam, setIsTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [athletes, setAthletes] = useState<Athlete[]>([emptyAthlete]);

  const handleAthleteChange = <K extends keyof Athlete>(
    index: number,
    field: K,
    value: Athlete[K]
  ) => {
    const updated = [...athletes];
    updated[index][field] = value;
    if (field === "sex") updated[index].weightClass = "";
    setAthletes(updated);
  };

  const addAthlete = () => {
    if (athletes.length < 4) {
      setAthletes([...athletes, { ...emptyAthlete, cwo: true }]);
    }
  };

  const removeAthlete = () => {
    if (athletes.length > 3) {
      setAthletes(athletes.slice(0, -1));
    }
  };

  const switchMode = (teamMode: boolean) => {
    setIsTeam(teamMode);
    if (teamMode) {
      setAthletes([
        { ...emptyAthlete, cwo: true },
        { ...emptyAthlete, cwo: true },
        { ...emptyAthlete, cwo: true },
      ]);
    } else {
      setAthletes([{ ...emptyAthlete, cwo: false }]);
      setTeamName("");
    }
  };

  const handleSubmit = async () => {
    if (isTeam && athletes.length < 3) {
      alert("Tým musí mít alespoň 3 členy!");
      return;
    }

    const payload = athletes.map((athlete) => ({
      ...athlete,
      cwo: isTeam ? true : athlete.cwo,
      team_id: isTeam ? teamName : null,
    }));

    const { data, error } = await supabase.from("athletes").insert(payload);
    console.log({ data, error });
    if (!error) {
      alert("Registrace úspěšná!");
      setTeamName("");
      setAthletes([emptyAthlete]);
      setIsTeam(false);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">Registrace</h1>

      {/* Mode Switch */}
      <div className="switch-buttons">
        <button className={!isTeam ? "active" : ""} onClick={() => switchMode(false)}>
          Jednotlivec
        </button>
        <button className={isTeam ? "active" : ""} onClick={() => switchMode(true)}>
          Tým
        </button>
      </div>

      {/* Team name */}
      {isTeam && (
        <div className="team-details">
          <label>Název týmu</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Zadejte název týmu"
            required
          />
        </div>
      )}

      {/* Athlete cards */}
      <div className={`athletes-grid ${isTeam ? "team" : "individual"}`}>
        {athletes.map((athlete, index) => (
          <div className={`athlete-card ${athlete.sex === "M" ? "male" : "female"}`} key={index}>
            <h3>
                {isTeam
                    ? index === 0
                    ? `Člen 1 - zástupce týmu`
                    : `Člen ${index + 1}`
                    : "Jednotlivec"}
                </h3>

            {/* Gender selector */}
            <div className="gender-switch">
              <button
                type="button"
                className={athlete.sex === "M" ? "active" : ""}
                onClick={() => handleAthleteChange(index, "sex", "M")}
              >
                ♂
              </button>
              <button
                type="button"
                className={athlete.sex === "F" ? "active" : ""}
                onClick={() => handleAthleteChange(index, "sex", "F")}
              >
                ♀
              </button>
            </div>

            <label>Jméno</label>
            <input
              type="text"
              value={athlete.firstName}
              onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
              required
            />

            <label>Příjmení</label>
            <input
              type="text"
              value={athlete.lastName}
              onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
              required
            />

            <label>Datum narození</label>
            <input
              type="date"
              value={athlete.birthDate}
              onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
              required
            />

            <label>Hmotnostní kategorie</label>
            <select
              value={athlete.weightClass}
              onChange={(e) => handleAthleteChange(index, "weightClass", e.target.value)}
              required
            >
              <option value="">-- Vyberte --</option>
              {(athlete.sex === "M" ? maleWeightClasses : femaleWeightClasses).map((wc) => (
                <option key={wc} value={wc}>
                  {wc}
                </option>
              ))}
            </select>

            <label>Dvojboj (kg)</label>
            <input
            type="number"
            value={athlete.total}
            onChange={(e) => handleAthleteChange(index, "total", Number(e.target.value))}
            min={35}
            max={999}
            required
            />

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={athlete.amcr}
                  onChange={(e) => handleAthleteChange(index, "amcr", e.target.checked)}
                />
                Účast AMČR
              </label>
              {athlete.amcr && (
                <select
                  value={athlete.university}
                  onChange={(e) => handleAthleteChange(index, "university", e.target.value)}
                  required={athlete.amcr}
                >
                  <option value="">-- Vyberte školu --</option>
                  {universities.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              )}
              {!isTeam && (
                <label>
                  <input
                    type="checkbox"
                    checked={athlete.cwo}
                    onChange={(e) => handleAthleteChange(index, "cwo", e.target.checked)}
                    required
                  />
                  Účast CWO
                </label>
              )}
            </div>

            <label>Mobil</label>
            <input
              type="tel"
              value={athlete.phone}
              onChange={(e) => handleAthleteChange(index, "phone", e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={athlete.email}
              onChange={(e) => handleAthleteChange(index, "email", e.target.value)}
              required
            />

            <label>Velikost trička</label>
            <select
              value={athlete.tshirtSize}
              onChange={(e) => handleAthleteChange(index, "tshirtSize", e.target.value)}
              required
            >
              <option value="">-- Vyberte velikost --</option>
              {tshirtSizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Add/remove buttons for teams */}
      {isTeam && (
        <div className="team-buttons">
          {athletes.length < 4 && (
            <button className="add-member" type="button" onClick={addAthlete}>
              Přidat člena
            </button>
          )}
          {athletes.length === 4 && (
            <button className="remove-member" type="button" onClick={removeAthlete}>
              Odebrat člena
            </button>
          )}
        </div>
      )}

      <button className="submit-button" onClick={handleSubmit}>
        Odeslat registraci
      </button>
    </div>
  );
}
