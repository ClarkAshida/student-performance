import React from "react";
import { useApi } from "@/context/ApiContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Plus,
} from "lucide-react";

const Home: React.FC = () => {
  const { classRooms, registerClassRoom, deleteClassRoom } = useApi();
  const [classRoomCode, setClassRoomCode] = React.useState("");
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  // Cálculos das métricas para o dashboard
  const totalStudents = classRooms.reduce(
    (sum, classroom) => sum + classroom.student_count,
    0
  );
  const totalClassrooms = classRooms.length;
  const averagePassRate =
    classRooms.length > 0
      ? classRooms.reduce((sum, classroom) => sum + classroom.pass_rate, 0) /
        classRooms.length
      : 0;

  // Calculando alunos aprovados e reprovados baseado na taxa de aprovação
  const totalStudentsPassed = classRooms.reduce(
    (sum, classroom) =>
      sum + Math.round(classroom.student_count * (classroom.pass_rate / 100)),
    0
  );
  const totalStudentsFailed = totalStudents - totalStudentsPassed;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassRoomCode(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerClassRoom({ code: classRoomCode });
      setClassRoomCode("");
      setShowCreateForm(false);
      alert("Turma criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      alert("Erro ao criar turma. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-heading font-semibold text-gray-900">
                Student Performance
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/turmas">Turmas</Link>
              </Button>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Alunos
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-semibold text-gray-900 mb-2">
            Dashboard Geral
          </h1>
          <p className="text-gray-600">
            Visão geral da performance acadêmica de todos os alunos e turmas
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Alunos */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total de Alunos
                  </p>
                  <p className="text-3xl font-heading font-bold text-gray-900">
                    {totalStudents.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total de Turmas */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total de Turmas
                  </p>
                  <p className="text-3xl font-heading font-bold text-gray-900">
                    {totalClassrooms}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Taxa de Aprovação Média */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Taxa de Aprovação
                  </p>
                  <p className="text-3xl font-heading font-bold text-success-600">
                    {averagePassRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {totalStudentsPassed} aprovados
                  </p>
                </div>
                <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alunos em Risco */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Alunos em Risco
                  </p>
                  <p className="text-3xl font-heading font-bold text-danger-600">
                    {totalStudentsFailed}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Predição: Reprovação
                  </p>
                </div>
                <div className="h-12 w-12 bg-danger-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-danger-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Desempenho por Turma */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Desempenho por Turma</span>
              </CardTitle>
              <CardDescription>
                Taxa de aprovação prevista por turma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classRooms.map((classroom) => (
                  <div
                    key={classroom.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-16 text-sm font-medium text-gray-600">
                      {classroom.code}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${classroom.pass_rate}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm font-medium text-gray-900">
                      {classroom.pass_rate.toFixed(0)}%
                    </div>
                  </div>
                ))}
                {classRooms.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma turma cadastrada ainda
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Distribuição de Status</span>
              </CardTitle>
              <CardDescription>
                Visão geral das predições de todos os alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-600" />
                    <span className="font-medium text-success-800">
                      Aprovados
                    </span>
                  </div>
                  <div className="text-success-600 font-bold">
                    {totalStudentsPassed}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-danger-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-5 w-5 text-danger-600" />
                    <span className="font-medium text-danger-800">
                      Em Risco
                    </span>
                  </div>
                  <div className="text-danger-600 font-bold">
                    {totalStudentsFailed}
                  </div>
                </div>
                {totalStudents === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum aluno cadastrado ainda
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Turmas */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gerenciar Turmas</CardTitle>
                <CardDescription>
                  Lista de todas as turmas cadastradas no sistema
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nova Turma</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Formulário de criação */}
            {showCreateForm && (
              <form
                onSubmit={handleSubmit}
                className="mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="classRoomCode">Código da Turma</Label>
                    <Input
                      id="classRoomCode"
                      type="text"
                      placeholder="Ex: 3º Ano A"
                      value={classRoomCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="mb-0">
                    Criar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="mb-0"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}

            {/* Lista de turmas */}
            <div className="space-y-3">
              {classRooms.map((classRoom) => (
                <div
                  key={classRoom.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Link
                    to={`/turma/${classRoom.id}`}
                    className="flex-1 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-gray-900">
                        {classRoom.code}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          <Users className="inline h-4 w-4 mr-1" />
                          {classRoom.student_count} alunos
                        </span>
                        <Badge
                          variant={
                            classRoom.pass_rate >= 70 ? "approved" : "warning"
                          }
                        >
                          {classRoom.pass_rate.toFixed(1)}% aprovação
                        </Badge>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        confirm(
                          `Tem certeza que deseja excluir a turma "${classRoom.code}"?`
                        )
                      ) {
                        deleteClassRoom(classRoom.id);
                      }
                    }}
                    className="ml-4"
                  >
                    Excluir
                  </Button>
                </div>
              ))}
              {classRooms.length === 0 && (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    Nenhuma turma cadastrada ainda
                  </p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    Criar primeira turma
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
