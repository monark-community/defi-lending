
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";

interface Pool {
  id: number;
  name: string;
  symbol: string;
  totalDeposits: number;
  currentAPY: number;
  utilizationRate: number;
  totalBorrowed: number;
  reserves: number;
  userDeposit: number;
  userEarned: number;
}

interface PoolCardProps {
  pool: Pool;
  onDeposit: (pool: Pool) => void;
  onWithdraw: (pool: Pool) => void;
}

const PoolCard = ({ pool, onDeposit, onWithdraw }: PoolCardProps) => {
  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(decimals)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(decimals)}K`;
    }
    return num.toFixed(decimals);
  };

  const getUtilizationColor = (rate: number) => {
    if (rate < 50) return "text-green-400";
    if (rate < 80) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">{pool.symbol.slice(0, 2)}</span>
            </div>
            <div>
              <CardTitle className="text-white">{pool.name}</CardTitle>
              <p className="text-slate-400 text-sm">{pool.symbol}</p>
            </div>
          </div>
          <Badge 
            className={`${pool.currentAPY > 7 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}
          >
            {pool.currentAPY}% APY
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pool Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-white">${formatNumber(pool.totalDeposits)}</div>
            <div className="text-xs text-slate-400">Total Deposits</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-white">${formatNumber(pool.totalBorrowed)}</div>
            <div className="text-xs text-slate-400">Total Borrowed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-white">${formatNumber(pool.reserves)}</div>
            <div className="text-xs text-slate-400">Reserves</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${getUtilizationColor(pool.utilizationRate)}`}>
              {pool.utilizationRate}%
            </div>
            <div className="text-xs text-slate-400">Utilization</div>
          </div>
        </div>

        {/* Utilization Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Pool Utilization</span>
            <span className={getUtilizationColor(pool.utilizationRate)}>
              {pool.utilizationRate}%
            </span>
          </div>
          <Progress 
            value={pool.utilizationRate} 
            className="h-2"
          />
        </div>

        {/* User Position (if exists) */}
        {pool.userDeposit > 0 && (
          <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <DollarSign className="w-4 h-4" />
              Your Position
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-lg font-semibold text-white">
                  {pool.symbol === 'USDC' ? `$${pool.userDeposit.toLocaleString()}` : `${pool.userDeposit} ${pool.symbol}`}
                </div>
                <div className="text-xs text-slate-400">Deposited</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-400">
                  {pool.symbol === 'USDC' ? `$${pool.userEarned.toFixed(2)}` : `${pool.userEarned} ${pool.symbol}`}
                </div>
                <div className="text-xs text-slate-400">Earned</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={() => onDeposit(pool)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Deposit
          </Button>
          {pool.userDeposit > 0 && (
            <Button 
              onClick={() => onWithdraw(pool)}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolCard;
