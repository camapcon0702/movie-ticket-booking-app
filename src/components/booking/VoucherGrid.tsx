import { useEffect, useState } from 'react';
import { Check, Film, Minus, Plus, Tag } from "lucide-react";
import { formatVND } from "../../hooks/booking/useSeatSelection";
import { fetchAllVouchers } from '../../services/voucher';
import type { VoucherResponse } from '../../types/response/VoucherRespones';

type VoucherGridProps = {
  selectedVoucher: VoucherResponse | null;
  onSelectVoucher: (voucher: VoucherResponse | null) => void;
};
const VoucherGrid =({ selectedVoucher, onSelectVoucher }: VoucherGridProps)=>{
    const [voucherData, setVoucherData] = useState<VoucherResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

     useEffect(() => {
        const loadVouchers = async () => {
          try {
            setLoading(true);
            setError(null);
            const data = await fetchAllVouchers();
            setVoucherData(data);
          } catch (err: any) {
            setError(err.message || 'Không tải được thông tin mã giảm giá');
          } finally {
            setLoading(false);
          }
        }
        loadVouchers();
      }, []);
    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Đang tải...</p>
            </div>
        </div>
        );
      }
    if (error || !voucherData) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
            <div className="text-center">
            <Film className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
            <p className="text-red-400 text-lg">{error || 'Không tìm thấy phim'}</p>
            </div>
        </div>
        );
    } 
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Tag className="text-pink-500" size={24} />
        Mã giảm giá
      </h2>

      <div className="space-y-2">
        {voucherData.map(voucher => {
          const isSelected = selectedVoucher?.id === voucher.id;
          const isExpired = new Date(voucher.expiryDate) < new Date();

          return (
            <button
              key={voucher.id}
              disabled={isExpired || !voucher.active}
              onClick={() => onSelectVoucher(isSelected ? null : voucher)}
              className={`w-full p-3 rounded-lg border-2 text-left ${
                isSelected
                  ? 'border-pink-500 bg-pink-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-pink-500 text-sm">
                  {voucher.code}
                </span>
                {isSelected && <Check size={14} className="text-pink-500" />}
              </div>

              <p className="text-xs text-gray-400">
                {voucher.discountPercentage
                  ? `Giảm ${voucher.discountPercentage}% (Tối đa ${formatVND(voucher.discountMax)})`
                  : `Giảm ${formatVND(voucher.discountAmount)}`}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
  


export default VoucherGrid;
