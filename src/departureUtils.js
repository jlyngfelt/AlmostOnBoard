export function getDepartures(allInformation)
{
    return allInformation.results?.map((result) => ({
        shortDirection: result?.serviceJourney?.directionDetails?.shortDirection ?? "No direction available",
        shortName: result?.serviceJourney?.line?.shortName ?? "No name available",
        transportMode: result?.serviceJourney?.line?.transportMode ?? "No transport mode available",
        stopPointName: result?.stopPoint?.name ?? "No stop point name available",
        isCancelled: result?.isCancelled ?? "No cancellation data available",
        estTime: result?.estimatedOtherwisePlannedTime ?? "No estimated time available",
        backgroundColor: result?.serviceJourney?.line?.backgroundColor ?? "No color available",
        foregroundColor: result?.serviceJourney?.line?.foregroundColor ?? "No color available"
        
    })) ?? [];
}


//Om inget resultat är tillgängligt crashar inte en error hela funktionen utan returnerar ett respons istället


