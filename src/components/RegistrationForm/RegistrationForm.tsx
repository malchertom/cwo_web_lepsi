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

const maleWeightClasses = ["-55kg", "-61kg", "-67kg", "-73kg", "-81kg", "-89kg", "-96kg", "-102kg", "-109kg", "+109kg"];
const femaleWeightClasses = ["-45kg","-49kg", "-55kg", "-59kg", "-64kg", "-71kg", "-76kg", "-81kg", "-87kg", "+87kg"];
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
  { name: "Univerzita obrany", code: "UNOB" },
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
  { name: "České vysoké učení technické v Praze", code: "ČVUT" },
  { name: "Vysoká škola tělesné výchovy a sportu Palestra, s.r.o., Praha ", code: "VŠTVS Palestra" }
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
  const [cisloFaktury, setcisloFaktury] = useState("");
  const [athletes, setAthletes] = useState<Athlete[]>([emptyAthlete]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      setAthletes([
        { ...emptyAthlete, cwo: true },
        { ...emptyAthlete, cwo: true },
        { ...emptyAthlete, cwo: true },
      ]);
    } else {
      setAthletes([{ ...emptyAthlete, cwo: false }]);
      setTeamName("");
      setcisloFaktury("");
    }
    setErrors({});
  };

  const toIsoDate = (d: string): string | null => {
    if (!d) return null;
    if (d.includes("-")) return d;
    if (d.includes("/")) {
      const parts = d.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        if (Number(day) && Number(month) && Number(year)) {
          return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
      }
    }
    return null;
  };

  const validateBeforeSubmit = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Faktura
    if (isTeam || athletes.some((a) => a.cwo)) {
      if (!cisloFaktury.trim()) {
        newErrors.cisloFaktury = "Číslo faktury je povinné.";
      } else if (!/^\d{8}$/.test(cisloFaktury)) {
        newErrors.cisloFaktury = "Číslo faktury musí mít přesně 8 číslic.";
      }
    }

    if (isTeam && !teamName.trim()) {
      newErrors.teamName = "Zadejte název týmu.";
    }

    athletes.forEach((athlete, index) => {
      if (!athlete.firstName.trim()) newErrors[`firstName_${index}`] = "Zadejte jméno.";
      if (!athlete.lastName.trim()) newErrors[`lastName_${index}`] = "Zadejte příjmení.";
      if (!athlete.birthDate.trim()) newErrors[`birthDate_${index}`] = "Zadejte datum narození.";
      if (!athlete.sex) newErrors[`sex_${index}`] = "Vyberte pohlaví.";
      if (!athlete.weightClass) newErrors[`weightClass_${index}`] = "Vyberte hmotnostní kategorii.";
      if (athlete.total === "" || isNaN(Number(athlete.total))) newErrors[`total_${index}`] = "Zadejte dvojboj (kg).";
      if (!athlete.email.trim()) newErrors[`email_${index}`] = "Zadejte email.";
      if (!athlete.phone.trim()) newErrors[`phone_${index}`] = "Zadejte mobil.";

      // Tričko povinné pokud CWO
      if (athlete.cwo && !athlete.tshirtSize) newErrors[`tshirtSize_${index}`] = "Vyberte velikost trička.";

      // Škola povinná pokud AMČR
      if (athlete.amcr && !athlete.university?.trim())
        newErrors[`university_${index}`] = "Vyberte školu pro AMČR.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateBeforeSubmit()) return;

    const isFakturaRequired = isTeam || athletes.some((a) => a.cwo);
    const fakturaValue = isFakturaRequired && cisloFaktury.trim() 
      ? Number(cisloFaktury) // Předpokládáme, že validace v tuto chvíli již zajistila, že jde o 8 číslic.
      : null; // Pokud faktura není required NEBO je required a prázdná (což by se mělo zachytit validací), pošleme null.

    const payload = athletes.map((athlete) => {
      const iso = toIsoDate(athlete.birthDate);
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
        Faktura: fakturaValue
      };
    });

    const { data, error } = await supabase.from("athletes").insert(payload);

    if (error) {
      alert("Chyba při ukládání: " + error.message);
    } else {
      alert("Registrace úspěšná!");
      setTeamName("");
      setcisloFaktury("");
      setAthletes([{ ...emptyAthlete }]);
      setIsTeam(false);
      setErrors({});
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">Registrace</h1>
      <p className="">V případě účasti na soutěži Czech Weighlifting Open 2025 je potřeba nejprve dokončit objednávku na kterou se dostanete pomocí žlutého tlačítka "PŘIHLÁŠENÍ" výše.</p>

      {/* Faktura */}
      <div className="team-details">
        <h3>Číslo faktury (pouze CWO)</h3>
        <input
          type="text"
          value={cisloFaktury}
          onChange={(e) => setcisloFaktury(e.target.value)}
          placeholder="Zadejte číslo faktury"
          className={errors.cisloFaktury ? "input-error" : ""}
        />
        {errors.cisloFaktury && <p className="error-text">{errors.cisloFaktury}</p>}
      </div>

      {/* Přepínač režimu */}
      <div className="switch-buttons">
        <button className={!isTeam ? "active" : ""} onClick={() => switchMode(false)}>Jednotlivec</button>
        <button className={isTeam ? "active" : ""} onClick={() => switchMode(true)}>Tým</button>
      </div>

      {/* Název týmu */}
      {isTeam && (
        <div className="team-details">
          <h3>Název týmu</h3>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Zadejte název týmu"
            className={errors.teamName ? "input-error" : ""}
          />
          {errors.teamName && <p className="error-text">{errors.teamName}</p>}
        </div>
      )}

      {/* Sportovci */}
      <div className={`athletes-grid ${isTeam ? "team" : "individual"}`}>
        {athletes.map((athlete, index) => (
          <div className={`athlete-card ${athlete.sex === "M" ? "male" : "female"}`} key={index}>
            <h3>{isTeam ? (index === 0 ? `Člen 1 – zástupce týmu` : `Člen ${index + 1}`) : "Jednotlivec"}</h3>

            {/* Pohlaví */}
            <div className="gender-switch">
              <button type="button" className={athlete.sex === "M" ? "active" : ""} onClick={() => handleAthleteChange(index, "sex", "M")}>♂</button>
              <button type="button" className={athlete.sex === "F" ? "active" : ""} onClick={() => handleAthleteChange(index, "sex", "F")}>♀</button>
            </div>

            {/* Jméno */}
            <label>Jméno</label>
            <input type="text" value={athlete.firstName} onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)} className={errors[`firstName_${index}`] ? "input-error" : ""} />
            {errors[`firstName_${index}`] && <p className="error-text">{errors[`firstName_${index}`]}</p>}

            {/* Příjmení */}
            <label>Příjmení</label>
            <input type="text" value={athlete.lastName} onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)} className={errors[`lastName_${index}`] ? "input-error" : ""} />
            {errors[`lastName_${index}`] && <p className="error-text">{errors[`lastName_${index}`]}</p>}

            {/* Datum narození */}
            <label>Datum narození</label>
            <input type="date" value={athlete.birthDate} onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)} className={errors[`birthDate_${index}`] ? "input-error" : ""} />
            {errors[`birthDate_${index}`] && <p className="error-text">{errors[`birthDate_${index}`]}</p>}

            {/* Váhovka */}
            <label>Hmotnostní kategorie</label>
            <select value={athlete.weightClass} onChange={(e) => handleAthleteChange(index, "weightClass", e.target.value)} className={errors[`weightClass_${index}`] ? "input-error" : ""}>
              <option value="">-- Vyberte --</option>
              {(athlete.sex === "M" ? maleWeightClasses : femaleWeightClasses).map((wc) => (
                <option key={wc} value={wc}>{wc}</option>
              ))}
            </select>
            {errors[`weightClass_${index}`] && <p className="error-text">{errors[`weightClass_${index}`]}</p>}

            {/* Dvojboj */}
            <label>Dvojboj (kg)</label>
            <input type="number" value={athlete.total} onChange={(e) => handleAthleteChange(index, "total", Number(e.target.value))} className={errors[`total_${index}`] ? "input-error" : ""} />
            {errors[`total_${index}`] && <p className="error-text">{errors[`total_${index}`]}</p>}

            {/* Email */}
            <label>Email</label>
            <input type="email" value={athlete.email} onChange={(e) => handleAthleteChange(index, "email", e.target.value)} className={errors[`email_${index}`] ? "input-error" : ""} />
            {errors[`email_${index}`] && <p className="error-text">{errors[`email_${index}`]}</p>}

            {/* Mobil */}
            <label>Mobil</label>
            <input type="tel" value={athlete.phone} onChange={(e) => handleAthleteChange(index, "phone", e.target.value)} className={errors[`phone_${index}`] ? "input-error" : ""} />
            {errors[`phone_${index}`] && <p className="error-text">{errors[`phone_${index}`]}</p>}

            {/* Tričko */}
            <label>Velikost trička (unisex střih)</label>
            <select value={athlete.tshirtSize} onChange={(e) => handleAthleteChange(index, "tshirtSize", e.target.value)} className={errors[`tshirtSize_${index}`] ? "input-error" : ""}>
              <option value="">-- Vyberte velikost --</option>
              {tshirtSizes.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            {errors[`tshirtSize_${index}`] && <p className="error-text">{errors[`tshirtSize_${index}`]}</p>}

            {/* Checkboxy */}
            {!isTeam && (
              <label className="checkbox-inline">
                <input type="checkbox" checked={athlete.cwo} onChange={(e) => handleAthleteChange(index, "cwo", e.target.checked)} /> Účast CWO
              </label>
            )}

            <label className="checkbox-inline">
              <input type="checkbox" checked={athlete.amcr} onChange={(e) => handleAthleteChange(index, "amcr", e.target.checked)} /> Účast AMČR
            </label>

            {/* Škola pro AMČR */}
            {athlete.amcr && (
              <>
                <label>Škola</label>
                <select value={athlete.university} onChange={(e) => handleAthleteChange(index, "university", e.target.value)} className={errors[`university_${index}`] ? "input-error" : ""}>
                  <option value="">-- Vyberte školu --</option>
                  {universities.map((u) => (<option key={u.code} value={u.code}>{u.name}</option>))}
                </select>
                {errors[`university_${index}`] && <p className="error-text">{errors[`university_${index}`]}</p>}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Týmové tlačítka */}
      {isTeam && (
        <div className="team-buttons">
          {athletes.length < 4 && <button className="add-member" type="button" onClick={addAthlete}>Přidat člena</button>}
          {athletes.length === 4 && <button className="remove-member" type="button" onClick={removeAthlete}>Odebrat člena</button>}
        </div>
      )}

      {/* Submit */}
      <button className="submit-button" onClick={handleSubmit}>Odeslat registraci</button>
    </div>
  );
}
