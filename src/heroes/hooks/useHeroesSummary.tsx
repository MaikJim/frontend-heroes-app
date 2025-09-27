
import { useQuery } from '@tanstack/react-query';
import { getSummaryAction } from '../actions/get-summary.action';

const useHeroesSummary = () => {
    return useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export { useHeroesSummary }
