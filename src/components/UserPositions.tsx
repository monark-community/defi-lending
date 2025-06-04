
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, DollarSign, Percent } from "lucide-react";

interface Pool {
  id: number;
  name: string;
  symbol: string;
  currentAPY: number;
  userDeposit: number;
  userEarned: number;
}

interface UserPositionsProps {
  pools: Pool[];
}

const UserPositions = ({ pools }: UserPositionsProps) => {
  const activePositions = pools.filter(pool => pool.userDeposit > 0);
  
  if (activePositions.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Active Positions</h3>
          <p className="text-slate-400">Start by depositing tokens into a lending pool to earn yield.</p>
        </CardContent>
      </Card>
    );
  }

  const totalValue = activePositions.reduce((acc, pool) => acc + pool.userDeposit, 0);
  const totalEarned = activePositions.reduce((acc, pool) => acc + pool.userEarned, 0);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                ${(totalValue + totalEarned).toLocaleString()}
              </div>
              <div className="text-slate-400">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                ${totalValue.toLocaleString()}
              </div>
              <div className="text-slate-400">Principal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                ${totalEarned.toFixed(2)}
              </div>
              <div className="text-slate-400">Total Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Positions */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Active Positions</h3>
        {activePositions.map((pool) => {
          const totalPosition = pool.userDeposit + pool.userEarned;
          const profitPercentage = ((pool.userEarned / pool.userDeposit) * 100);
          
          return (
            <Card key={pool.id} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">{pool.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{pool.name}</h4>
                      <p className="text-slate-400 text-sm">{pool.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-400 mb-2">
                      {pool.currentAPY}% APY
                    </Badge>
                    <div className="text-sm text-slate-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Active for 45 days
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-lg font-semibold text-white">
                      {pool.symbol === 'USDC' ? `$${pool.userDeposit.toLocaleString()}` : `${pool.userDeposit} ${pool.symbol}`}
                    </div>
                    <div className="text-slate-400 text-sm">Principal</div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-lg font-semibold text-green-400">
                      {pool.symbol === 'USDC' ? `$${pool.userEarned.toFixed(2)}` : `${pool.userEarned.toFixed(4)} ${pool.symbol}`}
                    </div>
                    <div className="text-slate-400 text-sm">Earned</div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-lg font-semibold text-white">
                      {pool.symbol === 'USDC' ? `$${totalPosition.toFixed(2)}` : `${totalPosition.toFixed(4)} ${pool.symbol}`}
                    </div>
                    <div className="text-slate-400 text-sm">Total Value</div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-lg font-semibold text-green-400">
                      +{profitPercentage.toFixed(2)}%
                    </div>
                    <div className="text-slate-400 text-sm">Profit</div>
                  </div>
                </div>

                {/* Earnings Progress */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Earning Progress</span>
                    <span className="text-white">{profitPercentage.toFixed(2)}% growth</span>
                  </div>
                  <Progress 
                    value={Math.min(profitPercentage, 100)} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserPositions;
