export const StatusBadge = ({ status }: { status: string }) => {
    const colors: any = {
        PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
        ACTIVE: "bg-green-100 text-green-800 border-green-200",
        SUSPENDED: "bg-red-100 text-red-800 border-red-200",
        DEACTIVATED: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${colors[status] || colors.DEACTIVATED}`}>
            {status === 'PENDING' ? 'EM ANÁLISE' : status}
        </span>
    );
};