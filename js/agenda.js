// Eliminamos las líneas de import/export y definimos el componente directamente
const AgendaComponent = () => {
  const [currentWeek, setCurrentWeek] = React.useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = React.useState(0);
  const [visibleDays, setVisibleDays] = React.useState([]);
  
  // Helper function to get week dates
  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const current = new Date(today);
    current.setDate(current.getDate() + (weekOffset * 7));
    
    // Get Monday of the week
    const monday = new Date(current);
    monday.setDate(current.getDate() - current.getDay() + 1);
    
    // Generate array of weekdays
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Initialize dates on component mount
  React.useEffect(() => {
    const weekDates = getWeekDates(currentWeekIndex);
    setCurrentWeek(weekDates);
    setVisibleDays(weekDates.slice(0, 3)); // Show first 3 days initially
  }, [currentWeekIndex]);

  // Format date for display
  const formatDate = (date) => {
    return {
      dayName: date.toLocaleDateString('es-ES', { weekday: 'long' }),
      dayNumber: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('es-ES', { month: 'long' })
    };
  };

  // Handle navigation
  const handleNavigation = (direction) => {
    const currentIndex = currentWeek.findIndex(date => 
      date.toDateString() === visibleDays[0].toDateString()
    );
    
    let newStartIndex;
    if (direction === 'next' && currentIndex + 3 < currentWeek.length) {
      newStartIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
      newStartIndex = currentIndex - 1;
    } else {
      return;
    }
    
    setVisibleDays(currentWeek.slice(newStartIndex, newStartIndex + 3));
  };

  // Get week range text
  const getWeekRangeText = () => {
    if (currentWeek.length === 0) return '';
    
    const firstDay = currentWeek[0];
    const lastDay = currentWeek[6];
    
    return {
      startMonth: firstDay.toLocaleDateString('es-ES', { month: 'long' }),
      startDay: firstDay.getDate(),
      endDay: lastDay.getDate(),
      endMonth: lastDay.toLocaleDateString('es-ES', { month: 'long' })
    };
  };

  const weekRange = getWeekRangeText();

  return (
    <div className="header-agenda-home d-flex justify-content-between">
      <div className="d-flex">
        <img src="imgs/icono-agenda-home.svg" alt="Agenda icon" />
        <h2>Agenda SGR</h2>
      </div>
      <div className="text-complementario">
        <span id="mes-inicio">{weekRange.startMonth} </span>
        <span id="dia-inicio-semana">{weekRange.startDay} </span>
        al <span id="dia-final-semana">{weekRange.endDay}</span> de 
        <span id="mes-final"> {weekRange.endMonth}</span>
      </div>
      <div className="contenedor-agenda-home">
        <div className="d-flex">
          <button 
            className="SGR-flecha-izq" 
            onClick={() => handleNavigation('prev')}
            aria-label="Días anteriores"
          >
            <img src="https://www.dnp.gov.co/assets/down-blue-arrow.svg" alt="Anterior" className="arrow-icon" />
          </button>
          
          {visibleDays.map((date, index) => {
            const formattedDate = formatDate(date);
            return (
              <div key={index} className="dias-agenda">
                <span className="dia">{formattedDate.dayName}</span>
                <span className="dia-calendario">{formattedDate.dayNumber}</span>
                <span className="etiquetas">Boletín SAR</span>
              </div>
            );
          })}
          
          <button 
            className="SGR-flecha-der"
            onClick={() => handleNavigation('next')}
            aria-label="Siguientes días"
          >
            <img src="https://www.dnp.gov.co/assets/down-blue-arrow.svg" alt="Siguiente" className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};