'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import ProjectForm from '@/components/Admin/ProjectForm';
import ClientForm from '@/components/Admin/ClientForm';

function DashboardContent() {
  const { data: session, update } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('tab') || 'projects-photography';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('project'); // 'project', 'user' or 'client'
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [userFormData, setUserFormData] = useState({ name: '', email: '', role: 'Viewer', isActive: false });
  const [clientFormData, setClientFormData] = useState({ 
    name: '', contactPerson: '', email: '', phone: '', website: '', industry: '', notes: '' 
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.success) setClients(data.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    // Sync with query param if it changes
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab.startsWith('projects-')) {
      fetchProjects();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'clients') {
      fetchClients();
    }
  }, [activeTab]);

  const initiateDelete = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowConfirm(true);
  };

  const openUserModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setUserFormData({ name: user.name || '', email: user.email, role: user.role, isActive: user.isActive || false });
    } else {
      setEditingUser(null);
      setUserFormData({ name: '', email: '', role: 'Viewer', isActive: false });
    }
    setShowUserModal(true);
  };

  const openProjectModal = (project = null) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const openClientModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setClientFormData({
        name: client.name || '',
        contactPerson: client.contactPerson || '',
        email: client.email || '',
        phone: client.phone || '',
        website: client.website || '',
        industry: client.industry || '',
        notes: client.notes || ''
      });
    } else {
      setEditingClient(null);
      setClientFormData({
        name: '', contactPerson: '', email: '', phone: '', website: '', industry: '', notes: ''
      });
    }
    setShowClientModal(true);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingUser ? 'PATCH' : 'POST';
      const body = editingUser ? { ...userFormData, id: editingUser._id } : userFormData;
      
      console.log('SAVE ACTION: Sending data:', body);
      
      const res = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      console.log('SAVE ACTION: Response:', data);

      if (res.ok && data.success) {
        if (editingUser && userFormData.email === session?.user?.email) {
          update({ name: userFormData.name });
        }
        await fetchUsers();
        setShowUserModal(false);
      } else {
        alert('Error al guardar: ' + (data.error || 'Error desconocido'));
      }
    } catch (e) { 
      console.error(e);
      alert('Error de conexión al guardar cambios.');
    }
  };

  const handleClientSuccess = (newClient) => {
    fetchClients();
    setShowClientModal(false);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      let endpoint;
      if (deleteType === 'project') endpoint = `/api/projects?id=${itemToDelete._id}`;
      else if (deleteType === 'user') endpoint = `/api/users?id=${itemToDelete._id}`;
      else if (deleteType === 'client') endpoint = `/api/clients?id=${itemToDelete._id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        if (deleteType === 'project') {
          setProjects(projects.filter(p => p._id !== itemToDelete._id));
        } else if (deleteType === 'user') {
          setUsers(users.filter(u => u._id !== itemToDelete._id));
        } else if (deleteType === 'client') {
          setClients(clients.filter(c => c._id !== itemToDelete._id));
        }
        setShowConfirm(false);
        setItemToDelete(null);
      }
    } catch (e) { console.error(e); }
  };

  const tabs = [
    { id: 'projects-reels', label: 'Reels', icon: 'movie_filter', category: 'Reels', categories: ['Reels', 'Reel'] },
    { id: 'projects-digital-arts', label: 'Artes Digitales', icon: 'polyline', category: 'Arte Digital', categories: ['Arte Digital', 'Digital Arts', 'Artes Digitales'] },
    { id: 'clients', label: 'Clientes', icon: 'business_center' },
    { id: 'users', label: 'Usuarios', icon: 'group' },
    { id: 'stats', label: 'Métricas', icon: 'analytics' },
  ];

  const filteredProjects = projects.filter(p => {
    const currentTab = tabs.find(t => t.id === activeTab);
    if (!currentTab?.categories) return true;
    return currentTab.categories.includes(p.category);
  });

  return (
    <>
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-m-md rounded-3xl p-8 shadow-2xl border border-primary/10"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">¿Confirmar eliminación?</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Estás a punto de borrar <span className="font-bold text-slate-900">"{itemToDelete?.title || itemToDelete?.name || itemToDelete?.email}"</span>. Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all text-sm"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 text-sm"
                >
                  Eliminar ahora
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showClientModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl p-10 shadow-2xl border border-primary/10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-display font-bold text-slate-900">
                  {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
                </h3>
                <button 
                  onClick={() => setShowClientModal(false)}
                  className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-all"
                >
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>
              <ClientForm 
                client={editingClient} 
                onSuccess={handleClientSuccess}
                onCancel={() => setShowClientModal(false)}
              />
            </motion.div>
          </motion.div>
        )}

        {showUserModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl p-10 shadow-2xl border border-primary/10"
            >
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-8">
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
              <form onSubmit={handleUserSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    disabled={!!editingUser}
                    value={userFormData.email}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    placeholder="ejemplo@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Nombre (Opcional)</label>
                  <input
                    type="text"
                    value={userFormData.name}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    placeholder="Nombre del usuario"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Rol de Acceso</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Viewer', 'Editor', 'Admin'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setUserFormData(prev => ({ ...prev, role }))}
                        className={`py-3 rounded-xl font-bold text-xs transition-all border-2 ${userFormData.role === role ? 'bg-primary text-white border-primary' : 'bg-transparent text-slate-400 border-slate-100 hover:border-primary/20'}`}
                      >
                        {role === 'Viewer' ? 'Observador' : role === 'Admin' ? 'Administrador' : role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Estado del Acceso (Portafolio)</label>
                  <label className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-primary/10 cursor-pointer hover:border-primary/30 transition-all">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={userFormData.isActive}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setUserFormData(prev => ({ ...prev, isActive: val }));
                        }}
                      />
                      <div className={`block w-14 h-8 rounded-full transition-colors ${userFormData.isActive ? 'bg-primary' : 'bg-slate-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${userFormData.isActive ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${userFormData.isActive ? 'text-primary' : 'text-slate-500'}`}>
                        {userFormData.isActive ? 'Cuenta Activa' : 'Cuenta Inactiva (Bloqueada)'}
                      </p>
                      <p className="text-[10px] text-slate-400">Si está inactiva, verá un mensaje al intentar acceder al Portafolio.</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm"
                  >
                    {editingUser ? 'Guardar Cambios' : 'Registrar Correo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {showProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl p-10 shadow-2xl border border-primary/10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-display font-bold text-slate-900">
                  {editingProject 
                    ? (activeTab === 'projects-reels' ? 'Editar Reel' : activeTab === 'projects-digital-arts' ? 'Editar Arte Digital' : activeTab === 'projects-photography' ? 'Editar Fotografía' : 'Editar Proyecto') 
                    : (activeTab === 'projects-reels' ? 'Añadir Nuevo Reel' : activeTab === 'projects-digital-arts' ? 'Añadir Artes Digitales' : activeTab === 'projects-photography' ? 'Añadir Fotografía' : 'Nuevo Registro')}
                </h3>
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <ProjectForm 
                embedded={true} 
                project={editingProject} 
                defaultCategory={tabs.find(t => t.id === activeTab)?.category}
                mode={
                  activeTab === 'projects-photography' ? 'photo' :
                  activeTab === 'projects-reels' ? 'reels' :
                  activeTab === 'projects-digital-arts' ? 'art' : 'all'
                }
                onSuccess={() => {
                  fetchProjects();
                  setTimeout(() => setShowProjectModal(false), 800);
                }} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 w-full pb-8 mt-[20vh]">
        {/* Spacer for fixed navbar */}
        <div className="shrink-0 h-[var(--navbar-height)]" />

        {/* Compact Header */}
        <header className="shrink-0 flex items-center justify-between gap-4 pb-4 border-b border-primary/10 mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-[clamp(1.2rem,2.5vw,2rem)] font-display font-bold text-slate-900 tracking-tight">Panel de Control</h1>
            <div className="hidden sm:flex items-center gap-3 bg-white px-3 py-2 rounded-2xl border border-primary/10 shadow-sm">
              <div className="relative">
                <img 
                  src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=3b512f&color=fff`} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-primary/5"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-900 font-bold text-sm">{session?.user?.name || 'David'}</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20">
                    {session?.user?.role || 'Admin'}
                  </span>
                </div>
                <p className="text-slate-500 font-body text-xs leading-none">{session?.user?.email}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-primary transition-all font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-95 group"
          >
            <span className="material-symbols-outlined text-base group-hover:rotate-12 transition-transform">logout</span>
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </header>

        {/* Tabs + Content */}
        <div className="flex flex-col gap-3">
          {/* Horizontal Tab Bar */}
          <div className="shrink-0 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  router.push(`/admin/dashboard?tab=${tab.id}`, { scroll: false });
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap border-2 ${activeTab === tab.id ? 'bg-primary text-white shadow-md shadow-primary/20 border-primary' : 'text-slate-500 hover:bg-slate-100 border-transparent'}`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="rounded-2xl">
            <AnimatePresence mode="wait">
              {activeTab.startsWith('projects-') && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <section className="bg-white p-8 rounded-3xl border border-primary/10">
                     <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">edit_square</span>
                          Gestión : {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        <button 
                          onClick={() => openProjectModal()}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                          <span className="material-symbols-outlined text-sm">add_circle</span>
                          {activeTab === 'projects-reels' ? 'Nuevo Reel' : activeTab === 'projects-digital-arts' ? 'Nuevo Arte Digital' : activeTab === 'projects-photography' ? 'Nueva Fotografía' : 'Nuevo Registro'}
                        </button>
                     </div>
                     
                     <div className="border-t border-primary/5 pt-8">
                        <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3 text-slate-700">
                          <span className="material-symbols-outlined text-primary/60">list_alt</span>
                          {activeTab === 'projects-reels' ? 'Reels Guardados' : activeTab === 'projects-digital-arts' ? 'Artes Guardados' : activeTab === 'projects-photography' ? 'Fotos Guardadas' : 'Registros Guardados'}
                        </h3>

                        {loading ? (
                          <p className="text-slate-400 py-10 text-center">Cargando proyectos...</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="border-b border-primary/5">
                                  <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">
                                    {activeTab === 'projects-reels' ? 'Reel' : activeTab === 'projects-digital-arts' ? 'Arte' : activeTab === 'projects-photography' ? 'Foto' : 'Proyecto'}
                                  </th>
                                  <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">URL Imagen</th>
                                  <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Categoría</th>
                                  <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black text-right">Acciones</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-primary/5">
                                {filteredProjects.length === 0 ? (
                                  <tr>
                                    <td colSpan="4" className="py-10 text-center text-slate-400 italic">
                                      No hay {activeTab === 'projects-reels' ? 'reels' : activeTab === 'projects-digital-arts' ? 'artes' : activeTab === 'projects-photography' ? 'fotos' : 'registros'} en esta categoría.
                                    </td>
                                  </tr>
                                ) : (
                                  filteredProjects.map(project => (
                                    <tr key={project._id} className="group hover:bg-primary/5 transition-colors">
                                      <td className="py-4 px-4">
                                        <div className="flex items-center gap-4">
                                          <div 
                                            className="w-14 h-14 rounded-xl bg-cover bg-center shadow-inner border border-black/5 flex-shrink-0" 
                                            style={{ backgroundImage: `url("${project.imageUrl}")` }} 
                                          />
                                          <div>
                                            <p className="font-bold text-slate-800">{project.title}</p>
                                            <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">{project.client || 'S2 Project'}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4 text-slate-500 text-xs font-body max-w-[200px] truncate">
                                        {project.imageUrl}
                                      </td>
                                      <td className="py-4 px-4">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                          project.category === 'Fotografía' ? 'bg-primary/10 text-primary border-primary/20' : 
                                          project.category === 'Reels' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                          'bg-purple-50 text-purple-600 border-purple-100'
                                        }`}>
                                          {project.category}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4">
                                        <div className="flex justify-end gap-2">
                                          <button 
                                            onClick={() => openProjectModal(project)}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                            title="Editar"
                                          >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                          </button>
                                          <button 
                                            onClick={() => initiateDelete(project, 'project')}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                            title="Borrar"
                                          >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                     </div>
                  </section>
                </motion.div>
              )}
              {activeTab === 'clients' && (
                <motion.div
                  key="clients"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <section className="bg-white p-8 rounded-3xl border border-primary/10">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">business_center</span>
                        Administración de Clientes
                      </h2>
                      <button 
                        onClick={() => openClientModal()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">add_business</span>
                        Nuevo Cliente
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-primary/5">
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Empresa</th>
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Dueño</th>
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Contacto</th>
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                          {loading ? (
                            <tr><td colSpan="4" className="py-10 text-center text-slate-400">Cargando clientes...</td></tr>
                          ) : clients.length === 0 ? (
                            <tr><td colSpan="4" className="py-10 text-center text-slate-400 italic">No hay clientes registrados.</td></tr>
                          ) : clients.map(client => (
                            <tr key={client._id} className="group hover:bg-primary/5 transition-colors">
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-bold text-slate-800">{client.name}</p>
                                  <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">{client.industry || 'General'}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-slate-600 text-sm">{client.contactPerson || '-'}</td>
                              <td className="py-4 px-4">
                                <p className="text-slate-500 text-xs font-body">{client.email}</p>
                                <p className="text-slate-400 text-[10px] font-body">{client.phone}</p>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => openClientModal(client)}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                                  >
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                  </button>
                                  <button 
                                    onClick={() => initiateDelete(client, 'client')}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                  >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </motion.div>
              )}
              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <section className="bg-white p-8 rounded-3xl border border-primary/10">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">group</span>
                        Listado de Usuarios
                      </h2>
                      <button 
                        onClick={() => openUserModal()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        Nuevo Usuario
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-primary/5">
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Usuario</th>
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Email</th>
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black">Rol / Estado</th>
                            <th className="pb-4 pt-2 px-4 text-xs uppercase tracking-widest text-slate-400 font-black text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                          {loading ? (
                            <tr><td colSpan="4" className="py-10 text-center text-slate-400">Cargando usuarios...</td></tr>
                          ) : users.length === 0 ? (
                            <tr><td colSpan="4" className="py-10 text-center text-slate-400 italic">No hay usuarios registrados.</td></tr>
                          ) : users.map(user => (
                            <tr key={user._id} className="group hover:bg-primary/5 transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={user.image || `https://ui-avatars.com/api/?name=${user.name || user.email}&background=f1f5f9&color=64748b`} 
                                    alt={user.name} 
                                    className="w-10 h-10 rounded-full border border-primary/10 object-cover" 
                                  />
                                  <span className="font-bold text-slate-800">{user.name || 'Pendiente...'}</span>
                                </div>
                              </td>
                               <td className="py-4 px-4 text-slate-500 text-sm font-body">{user.email}</td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col gap-2 items-start">
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                                    user.role === 'Admin' ? 'bg-primary/10 text-primary border-primary/20' : 
                                    user.role === 'Editor' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                    'bg-slate-50 text-slate-500 border-slate-200'
                                  }`}>
                                    {user.role === 'Viewer' ? 'Observador' : user.role === 'Admin' ? 'Administrador' : user.role}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border flex items-center gap-1 ${
                                    user.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {user.isActive ? 'Activo' : 'Inactivo'}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => openUserModal(user)}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                                  >
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                  </button>
                                  <button 
                                    onClick={() => initiateDelete(user, 'user')}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                  >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </motion.div>
              )}
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-12 rounded-3xl border border-primary/10 text-center"
                >
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">insights</span>
                  <p className="text-slate-500">Métricas de visualización en desarrollo.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-display font-bold">Cargando Panel...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
