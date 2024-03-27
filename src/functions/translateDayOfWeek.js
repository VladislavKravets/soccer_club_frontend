export const translateDayOfWeek = (dayOfWeek) => {
    if (!dayOfWeek) return dayOfWeek; // Проверка на undefined

    let day = dayOfWeek.trim();
    switch (day) {
        case 'Monday':
            return 'Понеділок';
        case 'Tuesday':
            return 'Вівторок';
        case 'Wednesday':
            return 'Середа';
        case 'Thursday':
            return 'Четвер';
        case 'Friday':
            return 'Пʼятниця';
        case 'Saturday':
            return 'Субота';
        case 'Sunday':
            return 'Неділя';
        default:
            return dayOfWeek;
    }
}
