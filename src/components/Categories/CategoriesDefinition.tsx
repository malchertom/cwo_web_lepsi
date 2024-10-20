import { motion } from "framer-motion"

export const soloWomen = (
    <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="categories-definition">
        <p>Kategorie jednotlivci ženy je určena pro ženy a dívky každého věku, avšak s minimálním možným věkem závodnice - 15 let dovršených v kalendářním roce konání daného ročníku soutěže. Tato kategorie je dle pravidel IWF a tedy i ČSV rozdělena do hmotnostních skupin závodnic, odpovídající hmotnosti závodnice v den soutěže, a to konkrétně:</p>
        <ol>
            <li>- 45 kg</li>
            <li>- 49 kg</li>
            <li>- 55 kg</li>
            <li>- 59 kg</li>
            <li>- 64 kg</li>
            <li>- 71 kg</li>
            <li>- 76 kg</li>
            <li>- 81 kg</li>
            <li>- 87 kg</li>
            <li>+ 87 kg</li>
        </ol>
        <p>(pravidla vážení závodnic i závodníků najdete v sekci “Pravidla a soutěžní řád ČSV”)</p><p>Minimální počet závodnic pro otevření dané hmotností skupiny je vždy 5. Při nižším počtu než 5 závodnic registrovaných do dané hmotnostní skupiny si pořadatel vyhrazuje právo sloučit hmotnostní skupiny dle předem stanovených počtů v nejbližších hmotnostních skupinách. Typicky pak směrem vzhůru v hierarchii hmotnostních skupin. Výsledné pořadí každé závodnice v rámci dané hmotnostní skupiny je určeno seřazením nejvyšších dosažených hodnot platného dvojboje v soutěži.</p>
    </motion.div>
)

export const soloMen = (
    <motion.div
        key="a"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="categories-definition">
        <p>Kategorie jednotlivci muži je určena pro muže a chlapce každého věku, avšak s minimálním možným věkem závodníka  - 15 let dovršených v kalendářním roce konání daného ročníku soutěže. Tato kategorie je dle pravidel IWF a tedy i ČSV rozdělena do hmotnostních skupin závodníků ,odpovídající hmotnosti závodníka v den soutěže, a to konkrétně:</p>
        <ol>
            <li>- 55 kg</li>
            <li>- 61 kg</li>
            <li>- 67 kg</li>
            <li>- 73 kg</li>
            <li>- 81 kg</li>
            <li>- 89 kg</li>
            <li>- 96 kg</li>
            <li>- 102 kg</li>
            <li>- 109 kg</li>
            <li>+ 109 kg</li>
        </ol>
        <p>(pravidla vážení závodnic i závodníků najdete v sekci “Pravidla a soutěžní řád ČSV”)</p><p>Minimální počet závodníků pro otevření dané hmotností skupiny je vždy 5. Při nižším počtu než 5 závodníků registrovaných do dané hmotnostní skupiny si pořadatel vyhrazuje právo sloučit hmotnostní skupiny dle předem stanovených počtů v nejbližších hmotnostních skupinách. Typicky pak směrem vzhůru v hierarchii hmotnostních skupin. Výsledné pořadí každého závodníka v rámci dané hmotnostní skupiny je určeno seřazením nejvyšších dosažených hodnot platného dvojboje v soutěži.</p>
    </motion.div>
)

export const teamOpen = (
    <motion.div
        key="b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="categories-definition">
        <p>Kategorie Team Open je určena pro čtyřčlenné týmy ve variabilním složení:</p>
        <ul>
            <li>4 ženy</li>
            <li>3 ženy + 1 muž</li>
            <li>2 ženy + 2 muži</li>
            <li>1 žena + 3 muži</li>
            <li>4 muži</li>
        </ul>
        <p>Tyto kombinace mohou být napříč všemi hmotnostními i věkovými skupinami. Výsledné pořadí všech týmů v rámci kategorie Team Open je určeno seřazením hodnot Sinclairových bodů týmů. Sinclairovy body celého týmu jsou výsledkem součtů všech SB každého člena daného týmu.</p>
    </motion.div>
)

export const teamOpenDead = (
    <motion.div
        key="c"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="categories-definition">
        <p>Kategorie Team Open - DeadWeight je určena pro jakýkoliv tým z kategorie Team Open. jehož členové se rozhodnou změřit síly navíc také v soutěži mrtvého tahu a nejen v klasickém vzpírání.</p><p>Každý tým této kategorie má možnost doplnit svou čtveřici o jednoho dalšího hostujícího člena, závodícího pouze v soutěži mrtvého tahu. V případě, že se daný tým rozhodne soutěžit v kategorii Team Open - DeadWeight bez možnosti doplnit tým o hostujícího siláka, může libovolně zvolit jednoho závodníka/závodnici ze svého týmu, který/á se soutěže v mrtvém tahu zúčastní za svůj tým. Tyto kombinace mohou být napříč všemi hmotnostními i věkovými skupinami.</p><p>Výsledné pořadí všech týmů v soutěži je určeno seřazením součtu bodů, který tvoří aritmetický průměr Sinclairových bodů čtyř vzpěračů a Wilksových bodů jednoho atleta za deadlift.</p>
    </motion.div>
)