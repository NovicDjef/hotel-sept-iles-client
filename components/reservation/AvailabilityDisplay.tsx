'use client'

import React from 'react'
import { useRoomAvailability } from '@/hooks/useRoomAvailability'
import { CheckCircle, XCircle, AlertCircle, Users } from 'lucide-react'
import type { RoomTypeAvailabilityBackend } from '@/services/api/roomAvailabilityApi'

interface AvailabilityDisplayProps {
  checkInDate: string
  checkOutDate: string
  onRoomTypeSelect?: (roomType: string) => void
  selectedRoomType?: string
}

/**
 * Composant pour afficher la disponibilité des chambres par type
 */
export const AvailabilityDisplay: React.FC<AvailabilityDisplayProps> = ({
  checkInDate,
  checkOutDate,
  onRoomTypeSelect,
  selectedRoomType,
}) => {
  const {
    roomTypes,
    loading,
    error,
    isFullyBooked,
    totalAvailableRooms,
    totalRooms,
    occupancyRate,
  } = useRoomAvailability(checkInDate, checkOutDate)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Vérification de la disponibilité...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
          <div>
            <h3 className="text-red-800 font-semibold">Erreur</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!roomTypes || roomTypes.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">
          Veuillez sélectionner des dates pour vérifier la disponibilité
        </p>
      </div>
    )
  }

  // Traduire les noms de types de chambres
  const getRoomTypeName = (type: string): string => {
    const names: Record<string, string> = {
      SIMPLE: 'Chambre Simple',
      DOUBLE: 'Chambre Double',
      SUITE: 'Suite',
      STUDIO: 'Studio',
      FAMILY: 'Familiale',
      DELUXE: 'Deluxe',
      EXECUTIVE: 'Exécutive',
    }
    return names[type] || type
  }

  return (
    <div className="space-y-4">
      {/* Résumé global */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Disponibilité de l'hôtel</h3>
            <p className="text-blue-100">
              {checkInDate} - {checkOutDate}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {totalAvailableRooms}/{totalRooms}
            </div>
            <div className="text-blue-100 text-sm">chambres disponibles</div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mt-4">
          <div className="bg-blue-800 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${100 - occupancyRate}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-blue-100 mt-1">
            <span>Occupation: {occupancyRate.toFixed(0)}%</span>
            <span>Disponible: {(100 - occupancyRate).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Alerte si complet */}
      {isFullyBooked && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h4 className="text-red-800 font-semibold text-lg">Hôtel Complet</h4>
              <p className="text-red-700 mt-1">
                Désolé, toutes les chambres sont réservées pour ces dates.
                Veuillez choisir d'autres dates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Liste des types de chambres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roomTypes.map((roomType) => (
          <RoomTypeCard
            key={roomType.roomType}
            roomType={roomType}
            getRoomTypeName={getRoomTypeName}
            onSelect={onRoomTypeSelect}
            isSelected={selectedRoomType === roomType.roomType}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Carte pour un type de chambre
 */
const RoomTypeCard: React.FC<{
  roomType: RoomTypeAvailabilityBackend
  getRoomTypeName: (type: string) => string
  onSelect?: (type: string) => void
  isSelected: boolean
}> = ({ roomType, getRoomTypeName, onSelect, isSelected }) => {
  const isAvailable = roomType.available > 0
  const isCritical = roomType.available > 0 && roomType.available <= 2

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : isAvailable
          ? 'border-gray-300 hover:border-blue-400 hover:shadow-md cursor-pointer'
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}
      onClick={() => isAvailable && onSelect?.(roomType.roomType)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-lg text-gray-800">
            {getRoomTypeName(roomType.roomType)}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            {isAvailable ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-700 font-medium">
                  Disponible
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700 font-medium">Complet</span>
              </>
            )}
          </div>
        </div>

        {/* Nombre disponible */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {roomType.available}
          </div>
          <div className="text-xs text-gray-600">sur {roomType.total}</div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-3">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className={`rounded-full h-2 transition-all ${
              isAvailable
                ? isCritical
                  ? 'bg-orange-500'
                  : 'bg-green-500'
                : 'bg-red-500'
            }`}
            style={{
              width: `${((roomType.total - roomType.available) / roomType.total) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Détails */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-1" />
          <span>{roomType.reserved} réservées</span>
        </div>
        <div className="text-gray-600">{roomType.percentage.toFixed(0)}% occupé</div>
      </div>

      {/* Alerte dernières chambres */}
      {isCritical && (
        <div className="mt-3 bg-orange-50 border border-orange-200 rounded px-3 py-2">
          <p className="text-xs text-orange-800 font-medium">
            ⚠️ Plus que {roomType.available} chambre{roomType.available > 1 ? 's' : ''}{' '}
            disponible{roomType.available > 1 ? 's' : ''} !
          </p>
        </div>
      )}
    </div>
  )
}
