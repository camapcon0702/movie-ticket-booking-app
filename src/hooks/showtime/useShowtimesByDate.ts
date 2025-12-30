import { useState, useMemo, useEffect } from 'react';
import type { Showtime } from '../../types/Showtime';

interface DateGroup {
  dateKey: string;       
  display: string;       
  showtimes: Showtime[]; 
}

const useShowtimesByDate = (showtimes: Showtime[]) => {
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const dateGroups = useMemo(() => {
    const map = new Map<string, Showtime[]>();

    showtimes.forEach((st) => {
      const dateKey = st.startTime.split('T')[0]; 
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(st);
    });

    const groups: DateGroup[] = Array.from(map.entries())
      .map(([dateKey, sts]) => {
        const [year, month, day] = dateKey.split('-');
        const display = `${day}/${month}/${year}`;

        const sortedShowtimes = [...sts].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );

        return { dateKey, display, showtimes: sortedShowtimes };
      })
      .sort((a, b) => a.dateKey.localeCompare(b.dateKey));

    return groups;
  }, [showtimes]);

  useEffect(() => {
    if (dateGroups.length > 0 && !selectedDateKey) {
      setSelectedDateKey(dateGroups[0].dateKey);
    }
  }, [dateGroups, selectedDateKey]);

 
  const selectedShowtimes = useMemo(() => {
    return dateGroups.find((g) => g.dateKey === selectedDateKey)?.showtimes || [];
  }, [dateGroups, selectedDateKey]);

  const selectDate = (dateKey: string) => {
    setSelectedDateKey(dateKey);
   
  };

  return {
    dateGroups,             
    selectedDateKey,
    selectDate,
    selectedShowtimes,       
    hasData: dateGroups.length > 0,
  };
};

export default  useShowtimesByDate ;