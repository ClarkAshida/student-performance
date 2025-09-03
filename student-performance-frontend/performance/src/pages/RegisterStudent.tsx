import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { StudentRegisterData } from "@/types/students";
import PredictionModal from "@/components/PredictionModal";
import { Button } from "@/components/ui/button";
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
  User,
  ArrowLeft,
  Save,
  Users,
  Home,
  BookOpen,
  Activity,
} from "lucide-react";
import axios from "axios";

const RegisterStudent: React.FC = () => {
  const { registerStudent, classRooms } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{
    student_name: string;
    final_result: "Passed" | "Failed";
    confidence: number;
    key_factors: {
      positive: string[];
      negative: string[];
    };
    recommendations: string[];
    risk_level: "Low" | "Medium" | "High";
  } | null>(null);

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<StudentRegisterData>({
    name: "",
    age: 0,
    gender: "",
    learning_desability: false,
    classes: 0,
    parental_involvement: "",
    access_to_resources: "",
    motivation_level: "",
    family_income: "",
    teacher_quality: "",
    peer_influence: "",
    parental_education: "",
    distance_from_home: "",
    hours_studied: 0,
    attendance: 0,
    extracurricular_activities: 0,
    sleep_hours: 0,
    previous_scores: 0,
    internet_access: false,
    tutoring_sessions: 0,
    school_type: "",
    physical_activity: 0,
  });

  // Função para atualizar os valores do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Converte para número se necessário
    const newValue =
      type === "number"
        ? parseFloat(value)
        : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Limpa erros de validação para o campo modificado
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});

    try {
      const response = await registerStudent(formData);

      // Simular dados de predição para demonstração
      const mockPredictionResult = {
        student_name: response.name,
        final_result:
          response.final_result === "Pass"
            ? ("Passed" as const)
            : ("Failed" as const),
        confidence: 0.85 + Math.random() * 0.14, // 85-99%
        key_factors: {
          positive:
            response.final_result === "Pass"
              ? [
                  "Boa frequência escolar",
                  "Horas de estudo adequadas",
                  "Motivação elevada",
                ]
              : ["Potencial acadêmico identificado"],
          negative:
            response.final_result === "Pass"
              ? []
              : [
                  "Frequência irregular",
                  "Baixas horas de estudo",
                  "Fatores sociais desfavoráveis",
                ],
        },
        recommendations:
          response.final_result === "Pass"
            ? [
                "Manter o ritmo atual de estudos",
                "Participar de atividades extracurriculares",
                "Buscar desafios adicionais",
              ]
            : [
                "Implementar programa de reforço escolar",
                "Aumentar acompanhamento familiar",
                "Considerar sessões de tutoria",
                "Trabalhar questões motivacionais",
              ],
        risk_level:
          response.final_result === "Pass"
            ? ("Low" as const)
            : ("High" as const),
      };

      setPredictionResult(mockPredictionResult);
      setShowPredictionModal(true);

      // Reset form after successful submission
      setFormData({
        name: "",
        age: 0,
        gender: "",
        learning_desability: false,
        classes: 0,
        parental_involvement: "",
        access_to_resources: "",
        motivation_level: "",
        family_income: "",
        teacher_quality: "",
        peer_influence: "",
        parental_education: "",
        distance_from_home: "",
        hours_studied: 0,
        attendance: 0,
        extracurricular_activities: 0,
        sleep_hours: 0,
        previous_scores: 0,
        internet_access: false,
        tutoring_sessions: 0,
        school_type: "",
        physical_activity: 0,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setValidationErrors(error.response.data);
        alert("Por favor, corrija os erros no formulário e tente novamente.");
      } else {
        alert("Erro ao cadastrar estudante. Tente novamente.");
      }
      console.error("Erro ao cadastrar estudante:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors[fieldName]?.[0];
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
                Novo Aluno
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-semibold text-gray-900 mb-2">
            Cadastrar Novo Aluno
          </h1>
          <p className="text-gray-600">
            Preencha todas as informações para registrar um novo aluno no
            sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Informações Básicas</span>
              </CardTitle>
              <CardDescription>
                Dados pessoais e identificação do aluno
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ex: João Silva Santos"
                    value={formData.name}
                    onChange={handleChange}
                    className={getFieldError("name") ? "border-danger-500" : ""}
                    required
                  />
                  {getFieldError("name") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("name")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="age">Idade *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min={5}
                    max={25}
                    placeholder="Ex: 16"
                    value={formData.age || ""}
                    onChange={handleChange}
                    className={getFieldError("age") ? "border-danger-500" : ""}
                    required
                  />
                  {getFieldError("age") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("age")}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gênero *</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("gender")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o gênero</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                  {getFieldError("gender") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("gender")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="classes">Turma *</Label>
                  <select
                    id="classes"
                    name="classes"
                    value={formData.classes}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("classes")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione a turma</option>
                    {classRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.code}
                      </option>
                    ))}
                  </select>
                  {getFieldError("classes") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("classes")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="learning_desability"
                  name="learning_desability"
                  checked={formData.learning_desability}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="learning_desability" className="cursor-pointer">
                  Possui dificuldade de aprendizado
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Performance Acadêmica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Performance Acadêmica</span>
              </CardTitle>
              <CardDescription>
                Informações sobre o desempenho e frequência escolar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="attendance">Frequência (%) *</Label>
                  <Input
                    id="attendance"
                    name="attendance"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Ex: 85"
                    value={formData.attendance || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("attendance") ? "border-danger-500" : ""
                    }
                    required
                  />
                  {getFieldError("attendance") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("attendance")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="previous_scores">Nota Anterior *</Label>
                  <Input
                    id="previous_scores"
                    name="previous_scores"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Ex: 7.5"
                    value={formData.previous_scores || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("previous_scores")
                        ? "border-danger-500"
                        : ""
                    }
                    required
                  />
                  {getFieldError("previous_scores") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("previous_scores")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hours_studied">
                    Horas de Estudo/Semana *
                  </Label>
                  <Input
                    id="hours_studied"
                    name="hours_studied"
                    type="number"
                    min={0}
                    max={168}
                    placeholder="Ex: 20"
                    value={formData.hours_studied || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("hours_studied") ? "border-danger-500" : ""
                    }
                    required
                  />
                  {getFieldError("hours_studied") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("hours_studied")}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="motivation_level">Nível de Motivação *</Label>
                  <select
                    id="motivation_level"
                    name="motivation_level"
                    value={formData.motivation_level}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("motivation_level")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="Low">Baixo</option>
                    <option value="Medium">Médio</option>
                    <option value="High">Alto</option>
                  </select>
                  {getFieldError("motivation_level") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("motivation_level")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="tutoring_sessions">
                    Sessões de Reforço *
                  </Label>
                  <Input
                    id="tutoring_sessions"
                    name="tutoring_sessions"
                    type="number"
                    min={0}
                    placeholder="Ex: 2"
                    value={formData.tutoring_sessions || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("tutoring_sessions")
                        ? "border-danger-500"
                        : ""
                    }
                    required
                  />
                  {getFieldError("tutoring_sessions") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("tutoring_sessions")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contexto Familiar e Social */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Contexto Familiar e Social</span>
              </CardTitle>
              <CardDescription>
                Informações sobre família e ambiente social do aluno
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parental_involvement">
                    Envolvimento Parental *
                  </Label>
                  <select
                    id="parental_involvement"
                    name="parental_involvement"
                    value={formData.parental_involvement}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("parental_involvement")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="Low">Baixo</option>
                    <option value="Medium">Médio</option>
                    <option value="High">Alto</option>
                  </select>
                  {getFieldError("parental_involvement") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("parental_involvement")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="family_income">Renda Familiar *</Label>
                  <select
                    id="family_income"
                    name="family_income"
                    value={formData.family_income}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("family_income")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione a faixa</option>
                    <option value="Low">Baixa</option>
                    <option value="Medium">Média</option>
                    <option value="High">Alta</option>
                  </select>
                  {getFieldError("family_income") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("family_income")}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parental_education">
                    Escolaridade dos Pais *
                  </Label>
                  <select
                    id="parental_education"
                    name="parental_education"
                    value={formData.parental_education}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("parental_education")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="High School">Ensino Médio</option>
                    <option value="College">Ensino Superior</option>
                    <option value="Postgraduate">Pós-graduação</option>
                  </select>
                  {getFieldError("parental_education") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("parental_education")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="peer_influence">
                    Influência dos Colegas *
                  </Label>
                  <select
                    id="peer_influence"
                    name="peer_influence"
                    value={formData.peer_influence}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("peer_influence")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Negative">Negativa</option>
                    <option value="Neutral">Neutra</option>
                    <option value="Positive">Positiva</option>
                  </select>
                  {getFieldError("peer_influence") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("peer_influence")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ambiente e Recursos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-primary" />
                <span>Ambiente e Recursos</span>
              </CardTitle>
              <CardDescription>
                Informações sobre escola, recursos e condições de estudo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="school_type">Tipo de Escola *</Label>
                  <select
                    id="school_type"
                    name="school_type"
                    value={formData.school_type}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("school_type")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Public">Pública</option>
                    <option value="Private">Privada</option>
                  </select>
                  {getFieldError("school_type") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("school_type")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="teacher_quality">
                    Qualidade do Professor *
                  </Label>
                  <select
                    id="teacher_quality"
                    name="teacher_quality"
                    value={formData.teacher_quality}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("teacher_quality")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="Low">Baixa</option>
                    <option value="Medium">Média</option>
                    <option value="High">Alta</option>
                  </select>
                  {getFieldError("teacher_quality") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("teacher_quality")}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="access_to_resources">
                    Acesso a Recursos *
                  </Label>
                  <select
                    id="access_to_resources"
                    name="access_to_resources"
                    value={formData.access_to_resources}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("access_to_resources")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="Low">Baixo</option>
                    <option value="Medium">Médio</option>
                    <option value="High">Alto</option>
                  </select>
                  {getFieldError("access_to_resources") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("access_to_resources")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="distance_from_home">
                    Distância de Casa *
                  </Label>
                  <select
                    id="distance_from_home"
                    name="distance_from_home"
                    value={formData.distance_from_home}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${
                      getFieldError("distance_from_home")
                        ? "border-danger-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    required
                  >
                    <option value="">Selecione a distância</option>
                    <option value="Near">Perto</option>
                    <option value="Moderate">Moderada</option>
                    <option value="Far">Longe</option>
                  </select>
                  {getFieldError("distance_from_home") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("distance_from_home")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internet_access"
                  name="internet_access"
                  checked={formData.internet_access}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="internet_access" className="cursor-pointer">
                  Possui acesso à internet em casa
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Atividades e Bem-estar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Atividades e Bem-estar</span>
              </CardTitle>
              <CardDescription>
                Informações sobre atividades extras e qualidade de vida
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sleep_hours">Horas de Sono/Dia *</Label>
                  <Input
                    id="sleep_hours"
                    name="sleep_hours"
                    type="number"
                    min={4}
                    max={12}
                    placeholder="Ex: 8"
                    value={formData.sleep_hours || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("sleep_hours") ? "border-danger-500" : ""
                    }
                    required
                  />
                  {getFieldError("sleep_hours") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("sleep_hours")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="extracurricular_activities">
                    Atividades Extracurriculares *
                  </Label>
                  <Input
                    id="extracurricular_activities"
                    name="extracurricular_activities"
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Ex: 2"
                    value={formData.extracurricular_activities || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("extracurricular_activities")
                        ? "border-danger-500"
                        : ""
                    }
                    required
                  />
                  {getFieldError("extracurricular_activities") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("extracurricular_activities")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="physical_activity">
                    Atividades Físicas/Semana *
                  </Label>
                  <Input
                    id="physical_activity"
                    name="physical_activity"
                    type="number"
                    min={0}
                    max={7}
                    placeholder="Ex: 3"
                    value={formData.physical_activity || ""}
                    onChange={handleChange}
                    className={
                      getFieldError("physical_activity")
                        ? "border-danger-500"
                        : ""
                    }
                    required
                  />
                  {getFieldError("physical_activity") && (
                    <p className="text-sm text-danger-600 mt-1">
                      {getFieldError("physical_activity")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" type="button" asChild>
              <Link to="/">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Cadastrar Aluno
                </>
              )}
            </Button>
          </div>
        </form>
      </main>

      {/* Prediction Modal */}
      <PredictionModal
        isOpen={showPredictionModal}
        onClose={() => setShowPredictionModal(false)}
        result={predictionResult}
      />
    </div>
  );
};

export default RegisterStudent;
