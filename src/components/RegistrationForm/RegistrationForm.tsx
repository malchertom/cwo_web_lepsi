import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./RegistrationForm.css";

type Athlete = {
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD (from input[type=date]) or DD/MM/YYYY if user typed
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
const universities = [
  { name: "Akademie múzických umění v Praze", code: "AMU" },
  { name: "Akademie výtvarných umění v Praze", code: "AVU" },
  { name: "Jihočeská univerzita v Českých Budějovicích", code: "JU" },
  { name: "Masarykova univerzita", code: "MU" },
  { name: "Mendelova univerzita v Brně", code: "MENDELU" },
  { name: "Ostravská univerzita", code: "OSU" },
  { name: "Slezská univerzita v Opavě", code: "SU" },
  { name: "Technická univerzita v Liberci", code: "TUL" },
  { name: "Univerzita Hradec Králové", code: "UHK" },
  { name: "Univerzita Jana Evangelisty Purkyně v Ústí nad Labem", code: "UJEP" },
  { name: "Univerzita Karlova", code: "UK" },
  { name: "Univerzita Palackého v Olomouci", code: "UP" },
  { name: "Univerzita Pardubice", code: "UPCE" },
  { name: "Univerzita Tomáše Bati ve Zlíně", code: "UTB" },
  { name: "Veterinární univerzita Brno", code: "VETUNI" },
  { name: "Vysoká škola báňská – Technická univerzita Ostrava", code: "VŠB-TUO" },
  { name: "Vysoká škola ekonomická v Praze", code: "VŠE" },
  { name: "Vysoká škola chemicko-technologická v Praze", code: "VŠCHT" },
  { name: "Vysoká škola uměleckoprůmyslová v Praze", code: "UMPRUM" },
  { name: "Vysoké učení technické v Brně", code: "VUT" },
  { name: "Západočeská univerzita v Plzni", code: "ZČU" },
  { name: "Česká zemědělská univerzita v Praze", code: "ČZU" },
  { name: "České vysoké učení technické v Praze", code: "ČVUT" }
];

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

  const handleAthleteChange = <K extends keyof Athlete>(index: number, field: K, value: Athlete[K]) => {
    const updated = [...athletes];
    updated[index] = { ...updated[index], [field]: value };
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
      // start with 3 independent members
      setAthletes([
        { ...emptyAthlete, cwo: true },
        { ...emptyAthlete, cwo: true },
        { ...emptyAthlete, cwo: true },
      ]);
    } else {
      // individual always exactly 1
      setAthletes([{ ...emptyAthlete, cwo: false }]);
      setTeamName("");
    }
  };

  // Accepts either YYYY-MM-DD or DD/MM/YYYY, returns YYYY-MM-DD or null
  const toIsoDate = (d: string): string | null => {
    if (!d) return null;
    if (d.includes("-")) {
      // probably already YYYY-MM-DD
      return d;
    }
    if (d.includes("/")) {
      const parts = d.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        // basic validation numeric
        if (Number(day) && Number(month) && Number(year)) {
          return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
      }
    }
    return null;
  };

  const validateBeforeSubmit = (): string | null => {
    if (isTeam && athletes.length < 3) return "Tým musí mít alespoň 3 členy.";

    if (isTeam && !teamName.trim()) return "Zadejte název týmu.";

    for (let i = 0; i < athletes.length; i++) {
      const a = athletes[i];
      if (!a.firstName.trim()) return `Člen ${i + 1}: Jméno je povinné.`;
      if (!a.lastName.trim()) return `Člen ${i + 1}: Příjmení je povinné.`;
      if (!a.birthDate.trim()) return `Člen ${i + 1}: Datum narození je povinné.`;
      const iso = toIsoDate(a.birthDate);
      if (!iso) return `Člen ${i + 1}: Datum narození musí být ve formátu DD/MM/RRRR nebo vybrán přes kalendář.`;
      if (!a.sex) return `Člen ${i + 1}: Pohlaví je povinné.`;
      if (!a.weightClass) return `Člen ${i + 1}: Hmotnostní kategorie je povinná.`;
      if (a.total === "" || a.total === null || isNaN(Number(a.total))) return `Člen ${i + 1}: Dvojboj je povinný.`;
      const totalNum = Number(a.total);
      if (totalNum < 35 || totalNum > 999) return `Člen ${i + 1}: Dvojboj musí být mezi 35 a 999 kg.`;
      if (!a.email.trim()) return `Člen ${i + 1}: Email je povinný.`;
      if (!a.phone.trim()) return `Člen ${i + 1}: Mobil je povinný.`;
      if (!a.tshirtSize) return `Člen ${i + 1}: Velikost trička je povinná.`;
      if (a.amcr && (!a.university || !a.university.trim())) return `Člen ${i + 1}: Vyberte školu pro AMČR.`;
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateBeforeSubmit();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Build payload mapping to your exact supabase column names
    const payload = athletes.map((athlete) => {
      const iso = toIsoDate(athlete.birthDate); // YYYY-MM-DD or null (we validated already)
      return {
        Jmeno: athlete.firstName,
        Prijmeni: athlete.lastName,
        Narozeni: iso,
        Pohlavi: athlete.sex,
        HK: athlete.weightClass,
        Dvojboj: athlete.total === "" ? null : Number(athlete.total),
        "Škola": athlete.amcr ? athlete.university ?? null : null,
        "Tel.": athlete.phone,
        Email: athlete.email,
        competition_cwo: isTeam ? true : athlete.cwo,
        competition_amcr: athlete.amcr,
        Tricko: athlete.tshirtSize,
        team_id: isTeam ? (teamName.trim() || null) : null,
      };
    });

    const { data, error } = await supabase.from("athletes").insert(payload);

    console.log({ data, error });
    if (error) {
      console.error("Supabase error:", error);
      alert("Chyba při ukládání: " + error.message);
    } else {
      alert("Registrace úspěšná!");
      // reset: individual single row, team resets to individual single as requested
      setTeamName("");
      setAthletes([{ ...emptyAthlete }]);
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
          <h3>Název teamu</h3>
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
              {isTeam ? (index === 0 ? `Člen 1 - zástupce týmu` : `Člen ${index + 1}`) : "Jednotlivec"}
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
            <input type="text" value={athlete.firstName} onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)} required />

            <label>Příjmení</label>
            <input type="text" value={athlete.lastName} onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)} required />

            <label>Datum narození</label>
            <input
              type="date"
              value={athlete.birthDate}
              onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
              placeholder="DD/MM/RRRR"
              pattern="\d{2}/\d{2}/\d{4}|^\d{4}-\d{2}-\d{2}$"
              required
            />

            <label>Hmotnostní kategorie</label>
            <select value={athlete.weightClass} onChange={(e) => handleAthleteChange(index, "weightClass", e.target.value)} required>
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

            <label>Email</label>
            <input type="email" value={athlete.email} onChange={(e) => handleAthleteChange(index, "email", e.target.value)} required />

            <label>Mobil</label>
            <input type="tel" value={athlete.phone} onChange={(e) => handleAthleteChange(index, "phone", e.target.value)} required />

            <label>Velikost trička</label>
            <select value={athlete.tshirtSize} onChange={(e) => handleAthleteChange(index, "tshirtSize", e.target.value)} required>
              <option value="">-- Vyberte velikost --</option>
              {tshirtSizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Team: CWO always true (no checkbox). Individual: allow CWO checkbox */}
            {!isTeam && (
              <label className="checkbox-inline">
                <input type="checkbox" checked={athlete.cwo} onChange={(e) => handleAthleteChange(index, "cwo", e.target.checked)} /> Účast CWO
              </label>
            )}

            <label className="checkbox-inline">
              <input type="checkbox" checked={athlete.amcr} onChange={(e) => handleAthleteChange(index, "amcr", e.target.checked)} /> Účast AMČR
            </label>

            {athlete.amcr && (
              <>
                <label>Škola</label>
                <select
                value={athlete.university}
                onChange={(e) => handleAthleteChange(index, "university", e.target.value)}
                required={athlete.amcr}
                >
                <option value="">-- Vyberte školu --</option>
                {universities.map((u) => (
                    <option key={u.code} value={u.code}>
                    {u.name}
                    </option>
                ))}
                </select>
              </>
            )}
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
