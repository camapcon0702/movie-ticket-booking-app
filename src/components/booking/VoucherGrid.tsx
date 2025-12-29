import { useEffect, useState } from 'react';
import { Check, Film, Tag } from "lucide-react";
import { fetchAllVouchers } from '../../services/voucher';
import type { VoucherResponse } from '../../types/response/VoucherRespones';
import { formatDate, formatVND } from '../../utils/formatters';

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
            <div className="w-16 h-16 border-4 border-[#F84565] border-t-transparent rounded-full animate-spin"></div>
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
        <Tag className="text-[#F84565]" size={24} />
        Mã giảm giá
      </h2>

      <div className="space-y-2">
        {voucherData.map(voucher => {
          const isSelected = selectedVoucher?.id === voucher.id;
          const isExpired = new Date(voucher.expiryDate) < new Date();
          const isDisabled = isExpired || !voucher.active;

          return (
            <button
              key={voucher.id}
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  onSelectVoucher(isSelected ? null : voucher);
                }
              }}
              className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                isDisabled
                  ? 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'border-[#F84565] bg-[#F84565]/10'
                  : 'border-gray-700 hover:border-gray-600 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${isDisabled ? 'text-gray-500' : 'text-[#F84565]'}`}>
                    {voucher.code}
                  </span>
                  {isSelected && <Check size={14} className="text-[#F84565]" />}
                </div>
                 <span className="text-xs ">
                    HSD : {formatDate(voucher.expiryDate)}
                  </span>
              
                
              </div>
              <p className={`text-xs mt-1 ${isDisabled ? 'text-gray-600' : 'text-gray-400'}`}>
                {voucher.discountPercentage
                  ? `Giảm ${voucher.discountPercentage}% (Tối đa ${formatVND(voucher.discountMax || 0)})`
                  : `Giảm ${formatVND(voucher.discountAmount || 0)}`}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};


export default VoucherGrid;
