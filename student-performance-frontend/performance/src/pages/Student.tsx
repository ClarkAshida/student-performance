import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { StudentData } from "../types/students";
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
  User,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Home,
  Users,
  Wifi,
  Heart,
  Activity,
  Brain,
  DollarSign,
  MapPin,
  School,
  Target,
  Edit,
} from "lucide-react";

const Student: React.FC = () => {
  const { fetchStudentDetails } = useApi();
  const { id } = useParams();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchStudentDetails(Number(id));
        setStudent(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do aluno...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2">
            Aluno não encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            O aluno solicitado não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (result: string) => {
    return result === "Passed" ? (
      <CheckCircle className="h-5 w-5 text-success-600" />
    ) : (
      <XCircle className="h-5 w-5 text-danger-600" />
    );
  };

  const getStatusBadge = (result: string) => {
    return result === "Passed" ? (
      <Badge variant="approved">Aprovado</Badge>
    ) : (
      <Badge variant="failed">Em Risco</Badge>
    );
  };

  const getMotivationColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "text-success-600 bg-success-100";
      case "medium":
        return "text-warning-600 bg-warning-100";
      case "low":
        return "text-danger-600 bg-danger-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-heading font-semibold text-gray-900">
                {student.name}
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/editar-aluno/${student.id}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-semibold text-gray-900 mb-2">
                Perfil do Aluno
              </h1>
              <p className="text-gray-600">
                Informações completas e análise de performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {getStatusIcon(student.final_result)}
              {getStatusBadge(student.final_result)}
            </div>
          </div>
        </div>

        {/* Student Overview Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
                  {student.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Idade</p>
                    <p className="font-medium text-gray-900">
                      {student.age} anos
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gênero</p>
                    <p className="font-medium text-gray-900">
                      {student.gender === "M" ? "Masculino" : "Feminino"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Turmas</p>
                    <p className="font-medium text-gray-900">
                      {student.classes}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status Final</p>
                    <div className="mt-1">
                      {getStatusBadge(student.final_result)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Performance Metrics */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Performance Acadêmica</span>
                </CardTitle>
                <CardDescription>
                  Métricas de desempenho e frequência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium text-gray-600">
                        Nota Anterior
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {student.previous_scores.toFixed(1)}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-success-600" />
                      <p className="text-sm font-medium text-gray-600">
                        Presença
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-success-600">
                      {student.attendance}%
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <p className="text-sm font-medium text-gray-600">
                        Horas de Estudo
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      {student.hours_studied}h/sem
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 text-indigo-600" />
                      <p className="text-sm font-medium text-gray-600">Sono</p>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">
                      {student.sleep_hours}h/dia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Environment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span>Ambiente de Estudo</span>
                </CardTitle>
                <CardDescription>
                  Recursos e condições para o aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Wifi className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Internet
                      </span>
                    </div>
                    <Badge
                      variant={student.internet_access ? "approved" : "failed"}
                    >
                      {student.internet_access ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Recursos
                      </span>
                    </div>
                    <Badge variant="default">
                      {student.access_to_resources}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Distância
                      </span>
                    </div>
                    <Badge variant="outline">
                      {student.distance_from_home}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <School className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Tipo de Escola
                      </span>
                    </div>
                    <Badge variant="outline">{student.school_type}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Personal & Social Factors */}
          <div className="space-y-6">
            {/* Personal Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Fatores Pessoais</span>
                </CardTitle>
                <CardDescription>
                  Características e condições individuais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Nível de Motivação
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMotivationColor(student.motivation_level)}`}
                  >
                    {student.motivation_level}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Dificuldade de Aprendizado
                      </span>
                    </div>
                    <Badge
                      variant={
                        student.learning_desability ? "warning" : "approved"
                      }
                    >
                      {student.learning_desability ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Atividade Física
                      </span>
                    </div>
                    <Badge variant="outline">{student.physical_activity}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Atividades Extra
                      </span>
                    </div>
                    <Badge variant="outline">
                      {student.extracurricular_activities}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Sessões de Reforço
                      </span>
                    </div>
                    <Badge variant="outline">{student.tutoring_sessions}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family & Social Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Contexto Familiar e Social</span>
                </CardTitle>
                <CardDescription>
                  Influências do ambiente familiar e social
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Envolvimento Parental
                      </span>
                    </div>
                    <Badge variant="default">
                      {student.parental_involvement}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Educação Parental
                      </span>
                    </div>
                    <Badge variant="outline">
                      {student.parental_education}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Renda Familiar
                      </span>
                    </div>
                    <Badge variant="outline">{student.family_income}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Influência dos Pares
                      </span>
                    </div>
                    <Badge variant="outline">{student.peer_influence}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Qualidade do Professor
                      </span>
                    </div>
                    <Badge variant="outline">{student.teacher_quality}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link to="/">Voltar ao Dashboard</Link>
          </Button>
          <Button asChild>
            <Link to={`/editar-aluno/${student.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Editar Aluno
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Student;
