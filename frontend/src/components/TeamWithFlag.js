import React from "react";
import styles from "./Schedule.module.css";

function TeamWithFlag({ teamName }) {
    return (
        <div className={styles.teamWithFlag}>
            {teamName}
            <img
                src={`https://flagsapi.codeaid.io/${teamName}.png`}
                width={53}
                height={37}
                className={styles.tableimage}
                alt={teamName}
            />
        </div>
    );
}

export default TeamWithFlag;
