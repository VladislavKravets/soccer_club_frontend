import React from 'react';

function StatsInfoTeam(props) {
    console.log(props.data)
    return (
        <div className="stats-info-team">
            <ul className="stats-info">
                <li className="stats-info__item">
                    {/*<svg className="stats-info__icon stats-info__icon--fill-color" width="30" height="42"><use xlink:href="/img/icons.svg#field"></use></svg>*/}
                    <div className="stats-info__main">
                        <div className="stats-info__text">Ігри</div>
                        <div className="stats-info__number">{props.data.numberMathPlayed}</div>
                    </div>
                </li>
                <li className="stats-info__item">
                    {/*<svg className="stats-info__icon stats-info__icon--stroke-color" width="40" height="40"><use xlink:href="/img/icons.svg#star-in-circle"></use></svg>*/}
                    <div className="stats-info__main">
                        <div className="stats-info__text">Перемоги</div>
                        <div className="stats-info__number">{props.data.wins}</div>
                    </div>
                </li>
                <li className="stats-info__item">
                    {/*<svg className="stats-info__icon stats-info__icon--fill-color" width="40" height="40"><use xlink:href="/img/icons.svg#ball"></use></svg>*/}
                    <div className="stats-info__main">
                        <div className="stats-info__text">Голи</div>
                        <div className="stats-info__number">{props.data.goals}</div>
                    </div>
                </li>
                <li className="stats-info__item">
                    {/*<svg class="stats-info__icon stats-info__icon--stroke-color" width="45" height="43"><use xlink:href="/img/icons.svg#cup"></use></svg>*/}
                    <div className="stats-info__main">
                        <div className="stats-info__text">Турніри</div>
                        <div className="stats-info__number">{props.data.playedTour}</div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default StatsInfoTeam;
