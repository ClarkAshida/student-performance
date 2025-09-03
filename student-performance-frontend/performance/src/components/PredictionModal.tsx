import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  X,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  BarChart3,
  Target,
  BookOpen,
} from "lucide-react";

interface PredictionResult {
  student_name: string;
  final_result: "Passed" | "Failed";
  confidence: number;
  key_factors: {
    positive: string[];
    negative: string[];
  };
  recommendations: string[];
  risk_level: "Low" | "Medium" | "High";
}

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PredictionResult | null;
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen || !result) return null;

  const isApproved = result.final_result === "Passed";

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "failed";
      default:
        return "outline";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return <CheckCircle className="h-4 w-4" />;
      case "Medium":
        return <AlertTriangle className="h-4 w-4" />;
      case "High":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className={`px-6 py-4 border-b ${
            isApproved
              ? "bg-success-50 border-success-200"
              : "bg-danger-50 border-danger-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isApproved ? (
                <CheckCircle className="h-8 w-8 text-success-600" />
              ) : (
                <XCircle className="h-8 w-8 text-danger-600" />
              )}
              <div>
                <h2 className="text-xl font-heading font-semibold text-gray-900">
                  Resultado da Predição
                </h2>
                <p className="text-sm text-gray-600">
                  Análise de performance para {result.student_name}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Result Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Resultado da Predição</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    {isApproved ? (
                      <CheckCircle className="h-8 w-8 text-success-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-danger-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Status Previsto</p>
                  <Badge
                    variant={isApproved ? "approved" : "failed"}
                    className="text-base"
                  >
                    {isApproved ? "Aprovado" : "Reprovação"}
                  </Badge>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Confiança</p>
                  <p className="text-2xl font-bold text-primary">
                    {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    {getRiskIcon(result.risk_level)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Nível de Risco</p>
                  <Badge
                    variant={getRiskColor(result.risk_level)}
                    className="text-base"
                  >
                    {result.risk_level === "Low"
                      ? "Baixo"
                      : result.risk_level === "Medium"
                        ? "Médio"
                        : "Alto"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Positive Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-success-600">
                  <TrendingUp className="h-5 w-5" />
                  <span>Fatores Positivos</span>
                </CardTitle>
                <CardDescription>
                  Aspectos que contribuem para o sucesso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.key_factors.positive.length > 0 ? (
                    result.key_factors.positive.map((factor, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4 text-success-600 flex-shrink-0" />
                        <span className="text-sm text-success-800">
                          {factor}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Nenhum fator positivo identificado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Negative Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-danger-600">
                  <TrendingDown className="h-5 w-5" />
                  <span>Fatores de Risco</span>
                </CardTitle>
                <CardDescription>
                  Aspectos que podem prejudicar o desempenho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.key_factors.negative.length > 0 ? (
                    result.key_factors.negative.map((factor, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-danger-50 rounded-lg"
                      >
                        <XCircle className="h-4 w-4 text-danger-600 flex-shrink-0" />
                        <span className="text-sm text-danger-800">
                          {factor}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Nenhum fator de risco identificado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Recomendações</span>
              </CardTitle>
              <CardDescription>
                Sugestões para melhorar o desempenho do aluno
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recommendations.length > 0 ? (
                  result.recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs text-white font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm text-blue-800">
                        {recommendation}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Nenhuma recomendação específica disponível
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={() => window.print()}>
              <BookOpen className="w-4 h-4 mr-2" />
              Imprimir Relatório
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
