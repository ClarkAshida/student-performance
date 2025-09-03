import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { ClassRoomDetails, ClassRoomStudents } from "../types/classRooms";
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
import {
  Users,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Search,
  Plus,
  ArrowLeft,
  UserCheck,
  Clock,
} from "lucide-react";

const Classroom: React.FC = () => {
  const { fetchClassRoomDetails, fetchClassRoomStudents, deleteStudent } =
    useApi();
  const { id } = useParams();
  const [classRoom, setClassRoom] = useState<ClassRoomDetails | null>(null);
  const [students, setStudents] = useState<ClassRoomStudents[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<
    "all" | "approved" | "failed"
  >("all");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchClassRoomDetails(Number(id));
        const studentsData = await fetchClassRoomStudents(Number(id));
        setStudents(studentsData);
        setClassRoom(data);
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
          <p className="text-gray-600">Carregando dados da turma...</p>
        </div>
      </div>
    );
  }

  if (!classRoom) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2">
            Turma não encontrada
          </h2>
          <p className="text-gray-600 mb-4">
            A turma solicitada não existe ou foi removida.
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

  const studentsArray = students || [];
  const filteredStudents = studentsArray.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "approved" && student.final_result === "Passed") ||
      (filterStatus === "failed" && student.final_result === "Failed");
    return matchesSearch && matchesFilter;
  });

  const approvedStudents = studentsArray.filter(
    (s) => s.final_result === "Passed"
  ).length;
  const failedStudents = studentsArray.filter(
    (s) => s.final_result === "Failed"
  ).length;

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
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-heading font-semibold text-gray-900">
                {classRoom.code}
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/estudante/novo">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Aluno
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
          <h1 className="text-3xl font-heading font-semibold text-gray-900 mb-2">
            Detalhes da Turma: {classRoom.code}
          </h1>
          <p className="text-gray-600">
            Informações detalhadas sobre os alunos e performance da turma
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
                    {classRoom.student_count}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Taxa de Aprovação */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Taxa de Aprovação
                  </p>
                  <p className="text-3xl font-heading font-bold text-success-600">
                    {classRoom.pass_rate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {approvedStudents} de {studentsArray.length} alunos
                  </p>
                </div>
                <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Presença Média */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Presença Média
                  </p>
                  <p className="text-3xl font-heading font-bold text-warning-600">
                    {classRoom.average_attendance.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Frequência da turma
                  </p>
                </div>
                <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horas de Estudo */}
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Horas de Estudo
                  </p>
                  <p className="text-3xl font-heading font-bold text-primary">
                    {classRoom.average_hours_studied.toFixed(1)}h
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Média semanal</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Alunos */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle>Lista de Alunos</CardTitle>
                <CardDescription>
                  Gerenciar e visualizar todos os alunos da turma
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Filtros */}
                <div className="flex space-x-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                  >
                    Todos ({studentsArray.length})
                  </Button>
                  <Button
                    variant={
                      filterStatus === "approved" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setFilterStatus("approved")}
                  >
                    Aprovados ({approvedStudents})
                  </Button>
                  <Button
                    variant={filterStatus === "failed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("failed")}
                  >
                    Em Risco ({failedStudents})
                  </Button>
                </div>
              </div>
            </div>
            {/* Barra de Pesquisa */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Nome
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Idade
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Presença
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Horas/Semana
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Nota Anterior
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {student.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {student.gender === "M"
                                  ? "Masculino"
                                  : "Feminino"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {student.age} anos
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.attendance >= 80
                                    ? "bg-success-500"
                                    : student.attendance >= 60
                                      ? "bg-warning-500"
                                      : "bg-danger-500"
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {student.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {student.hours_studied}h
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              student.previous_scores >= 70
                                ? "approved"
                                : "warning"
                            }
                          >
                            {student.previous_scores.toFixed(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              student.final_result === "Passed"
                                ? "approved"
                                : "failed"
                            }
                          >
                            {student.final_result === "Passed"
                              ? "Aprovado"
                              : "Em Risco"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/aluno/${student.id}`}>
                                Ver Detalhes
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/editar-aluno/${student.id}`}>
                                Editar
                              </Link>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Tem certeza que deseja excluir o aluno "${student.name}"?`
                                  )
                                ) {
                                  deleteStudent(student.id);
                                }
                              }}
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredStudents.map((student) => (
                <Card
                  key={student.id}
                  className="hover:shadow-card-hover transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {student.age} anos •{" "}
                            {student.gender === "M" ? "Masculino" : "Feminino"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          student.final_result === "Passed"
                            ? "approved"
                            : "failed"
                        }
                      >
                        {student.final_result === "Passed"
                          ? "Aprovado"
                          : "Em Risco"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600">Presença</p>
                        <p className="font-medium">{student.attendance}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Horas/Semana</p>
                        <p className="font-medium">{student.hours_studied}h</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Nota Anterior</p>
                        <Badge
                          variant={
                            student.previous_scores >= 70
                              ? "approved"
                              : "warning"
                          }
                        >
                          {student.previous_scores.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/aluno/${student.id}`}>Ver Detalhes</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/editar-aluno/${student.id}`}>Editar</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm
                    ? "Nenhum aluno encontrado"
                    : "Nenhum aluno cadastrado"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "Tente ajustar os filtros ou termo de busca"
                    : "Comece adicionando o primeiro aluno à turma"}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link to="/estudante/novo">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Aluno
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Classroom;
